import type { Metadata } from "next";
import { ContactForm } from "@/components/site/forms";
import { LocalTime } from "@/components/site/LocalTime";
import { Reveal, SplitText } from "@/components/site/motion";
import { getServices, getSettings } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with us.",
};

export default async function ContactPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
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
            Tell us a little about what you&apos;re building. We reply to every message within one working day — usually
            much sooner.
          </p>
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
            <div>
              <p className="eyebrow text-mute">Studio</p>
              {settings.address && <p className="mt-1 text-xl">{settings.address}</p>}
              <LocalTime className="eyebrow mt-2 block text-ember" />
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.3} className="md:col-span-6 md:col-start-7 md:pt-24">
        <ContactForm services={services.map((s) => s.title)} />
      </Reveal>
    </section>
  );
}
