import type { Metadata } from "next";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { PageSection } from "@/components/page-section";

export const metadata: Metadata = {
  title: "Contact"
};

export const revalidate = 60;

export default function ContactPage() {
  const items = [
    { icon: MapPin, label: "Address", value: "2120 Jimmy Durante Blvd Ste. 121, Del Mar, CA 92014" },
    { icon: Phone, label: "Phone", value: "(858) 265-8982", href: "tel:+18582658982" },
    { icon: Globe, label: "Website", value: "www.delmarjiujitsuclub.com", href: "https://www.delmarjiujitsuclub.com" },
    { icon: Mail, label: "Email", value: "info@delmarjiujitsuclub.com", href: "mailto:info@delmarjiujitsuclub.com" }
  ];

  return (
    <PageSection
      eyebrow="Help"
      title="Contact the Academy"
      description="Questions about the Community Hub? Contact the academy and we'll help you out."
      tone="warm"
    >
      <div>
        {items.map(({ icon: Icon, label, value, href }) => (
          <article key={label} className="grid gap-4 border-t border-academy-line/15 py-5 last:border-b md:grid-cols-[.6fr_1.4fr] md:items-center">
            <div className="flex items-center gap-3">
              <Icon className="text-academy-blue" size={24} aria-hidden="true" />
              <h2 className="text-sm font-black uppercase tracking-[.16em] text-academy-muted">{label}</h2>
            </div>
            {href ? (
              <a className="block font-display text-xl font-black uppercase leading-7 text-academy-foreground hover:text-academy-blue sm:text-2xl sm:leading-8" href={href}>{value}</a>
            ) : (
              <p className="font-display text-xl font-black uppercase leading-7 text-academy-foreground sm:text-2xl sm:leading-8">{value}</p>
            )}
          </article>
        ))}
      </div>
      <div className="mt-7">
        <CtaButton href="mailto:info@delmarjiujitsuclub.com">Email the Academy</CtaButton>
      </div>
    </PageSection>
  );
}
