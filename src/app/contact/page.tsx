import { createMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = createMetadata({
  title: "Contact",
  description: "Tell us about your project — we reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="relative pt-40 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
          / Contact
        </div>
        <div className="mt-8 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tight text-gold-gradient">
              Start a project.
            </h1>
            <p className="mt-8 max-w-md text-lg text-[color:var(--color-fg-soft)]">
              Tell us a little about your brand, your goals and the timeline —
              we&apos;ll reply within one business day.
            </p>

            <dl className="mt-14 space-y-6">
              <div>
                <dt className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
                  Email
                </dt>
                <dd className="mt-2 font-display text-xl">
                  <a href="mailto:hello@aureo.studio">hello@aureo.studio</a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
                  Agency
                </dt>
                <dd className="mt-2 font-display text-xl">Remote · Worldwide</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
                  Social
                </dt>
                <dd className="mt-2 flex gap-4 font-mono text-sm">
                  <a href="#" className="hover:text-[color:var(--color-gold-300)]">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-[color:var(--color-gold-300)]">
                    LinkedIn
                  </a>
                  <a href="#" className="hover:text-[color:var(--color-gold-300)]">
                    Behance
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-6">
            <div className="rounded-2xl border border-white/10 bg-[color:var(--color-ink-2)] p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
