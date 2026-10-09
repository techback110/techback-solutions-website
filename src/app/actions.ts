"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createInquiry, createReview } from "@/lib/data";
import { allow, clientKey } from "@/lib/rate-limit";
import type { ActionState } from "@/lib/types";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(120),
  email: z.email("Enter a valid email").max(200),
  company: z.string().trim().max(160).optional(),
  budget: z.string().trim().max(40).optional(),
  engagement: z.string().trim().max(40).optional(),
  timeline: z.string().trim().max(40).optional(),
  service: z.string().trim().max(80).optional(),
  link: z.string().trim().max(300).optional(),
  nda: z.string().optional(),
  message: z.string().trim().min(10, "A few more words, please").max(5000),
  /* Attribution. Hidden inputs, so they are advisory only and bounded. */
  ref: z.string().trim().max(120).optional(),
  utm_source: z.string().trim().max(120).optional(),
  utm_medium: z.string().trim().max(120).optional(),
  utm_campaign: z.string().trim().max(120).optional(),
});

const TOO_MANY = "That's a few messages in a short time. Please email us directly and we'll pick it up.";

export async function submitInquiry(_: ActionState, formData: FormData): Promise<ActionState> {
  // Honeypot: real people never see or fill this field. Report success so a bot
  // gets no signal about why it failed.
  if (formData.get("website")) return { ok: true, message: "Thanks!" };

  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Please check the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  // Counted after validation: typos and short messages are not submissions, and
  // charging for them would lock someone out mid-correction.
  if (!allow(`inquiry:${await clientKey()}`, { limit: 5, windowMs: 10 * 60_000 })) {
    return { error: TOO_MANY };
  }

  try {
    const d = parsed.data;
    await createInquiry({
      name: d.name,
      email: d.email,
      company: d.company || null,
      budget: d.budget || null,
      engagement: d.engagement || null,
      timeline: d.timeline || null,
      service: d.service || null,
      link: d.link || null,
      nda: d.nda === "on",
      ref: d.ref || null,
      utm_source: d.utm_source || null,
      utm_medium: d.utm_medium || null,
      utm_campaign: d.utm_campaign || null,
      message: d.message,
      read: false,
    });
  } catch (err) {
    console.error("[inquiry]", err);
    return { error: "Something went wrong on our side. Please email us directly." };
  }

  revalidatePath("/admin", "layout");
  return { ok: true, message: "Message received — we'll reply within one working day." };
}

const reviewSchema = z.object({
  author: z.string().trim().min(2, "Your name is required").max(120),
  role: z.string().trim().max(120).default(""),
  company: z.string().trim().max(160).default(""),
  rating: z.coerce.number().int().min(1).max(5),
  content: z.string().trim().min(20, "Please write at least 20 characters").max(1200),
});

export async function submitReview(_: ActionState, formData: FormData): Promise<ActionState> {
  if (formData.get("website")) return { ok: true, message: "Thanks!" };

  const parsed = reviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Please check the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  // Tighter than the inquiry form: nobody legitimately leaves three reviews.
  if (!allow(`review:${await clientKey()}`, { limit: 2, windowMs: 60 * 60_000 })) {
    return { error: TOO_MANY };
  }

  try {
    await createReview({ ...parsed.data, avatar_url: null, featured: false, approved: false });
  } catch (err) {
    console.error("[review]", err);
    return { error: "We couldn't save your review. Please try again." };
  }

  revalidatePath("/admin", "layout");
  return { ok: true, message: "Thank you! Your review will appear once our team approves it." };
}
