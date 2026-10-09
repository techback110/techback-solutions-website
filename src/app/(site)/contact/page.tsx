import type { Metadata } from "next";
import { ContactForm } from "@/components/site/forms";
import { LocalTime } from "@/components/site/LocalTime";
import { Reveal, SplitText } from "@/components/site/motion";
import { getServices, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { safeHref } from "@/lib/utils";

export const revalidate = 60;
export const metadata: Metadata = pageMeta({
  path: "/contact",
  title: "Contact",
  description:
    "Tell us what you are building. We reply to every enquiry within one working day, and you speak to the people who will do the work. Mumbai, working worldwide.",
  images: ["/opengraph-image.png"],
});

const STEPS = [
  ["We read it", "A person, not an autoresponder. If it is not a fit we say so quickly."],
  ["A call", "Thirty minutes with whoever would actually do the work. No sales pitch."],
  ["A written proposal", "Scope, timeline and cost in writing, so you can compare it to anyone else."],
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const [services, settings, params] = await Promise.all([getServices(), getSettings(), searchParams]);

  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const attribution = {
    ref: one(params.ref),
    utm_source: one(params.utm_source),
    utm_medium: one(params.utm_medium),
    utm_campaign: one(params.utm_campaign),
  };

  return (
    <section className="container-x grid gap-16 pb-32 pt-40 sm:pt-52 md:grid-cols-12">
      <div className="md:col-span-5">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-3 text-mute">
            <span className="h-px w-10 bg-ember" />
            Start a project
          </p>
        </Reveal>
        <SplitText as="h1" immediate text="Let's *talk.*" className="display text-[clamp(4rem,11vw,10rem)]" />
        <Reveal delay={0.4} className="mt-10 space-y-10">
          <p className="max-w-sm text-lg leading-relaxed text-bone/65">
            {settings.reply_time_promise ||
              "Tell us a little about what you're building. We reply to every message within one working day, usually much sooner."}
          </p>
          {settings.reply_time_miss_policy && (
            <p className="max-w-sm text-sm leading-relaxed text-mute">{settings.reply_time_miss_policy}</p>
          )}
          <div className="space-y-6 border-t border-line pt-8">
            <div>
              <p className="eyebrow text-mute">Email</p>
              <a href={`mailto:${settings.email}`} className="link-underline mt-1 inline-block text-xl">
                {settings.email}
              </a>
            </div>
            {settings.phone && (
              <div>
                <p className="eyebrow text-mute">Phone</p>
                <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className="mt-1 inline-block text-xl">
                  {settings.phone}
                </a>
              </div>
            )}
            {settings.whatsapp && (
              <div>
                <p className="eyebrow text-mute">WhatsApp</p>
                <a
                  href={
                    safeHref(settings.whatsapp) ??
                    `https://wa.me/${settings.whatsapp.replace(/[^\d]/g, "")}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline mt-1 inline-block text-xl"
                >
                  {settings.whatsapp}
                </a>
              </div>
            )}
            <div>
              <p className="eyebrow text-mute">Studio</p>
              {(settings.address || settings.hq) && (
                <p className="mt-1 text-xl">{settings.address || settings.hq}</p>
              )}
              {settings.office_hours && <p className="mt-1 text-bone/60">{settings.office_hours}</p>}
              <LocalTime className="eyebrow mt-2 block text-ember" />
            </div>
          </div>

          <div className="border-t border-line pt-8">
            <p className="eyebrow mb-6 text-mute">What happens next</p>
            <ol className="space-y-5">
              {STEPS.map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="eyebrow mt-1 text-ember">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block">{title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-bone/55">{body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.3} className="md:col-span-6 md:col-start-7 md:pt-24">
        <ContactForm services={services.map((s) => s.title)} attribution={attribution} />
      </Reveal>
    </section>
  );
}
