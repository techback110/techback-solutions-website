"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createInquiry, createReview } from "@/lib/data";
import type { ActionState } from "@/lib/types";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(120),
  email: z.email("Enter a valid email").max(200),
  company: z.string().trim().max(160).optional(),
  budget: z.string().trim().max(40).optional(),
  service: z.string().trim().max(80).optional(),
  message: z.string().trim().min(10, "A few more words, please").max(5000),
});

export async function submitInquiry(_: ActionState, formData: FormData): Promise<ActionState> {
  // Honeypot: real people never see or fill this field.
  if (formData.get("website")) return { ok: true, message: "Thanks!" };

  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Please check the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    const d = parsed.data;
    await createInquiry({
      name: d.name,
      email: d.email,
      company: d.company || null,
      budget: d.budget || null,
      service: d.service || null,
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

  try {
    await createReview({ ...parsed.data, avatar_url: null, featured: false, approved: false });
  } catch (err) {
    console.error("[review]", err);
    return { error: "We couldn't save your review. Please try again." };
  }

  revalidatePath("/admin", "layout");
  return { ok: true, message: "Thank you! Your review will appear once our team approves it." };
}
