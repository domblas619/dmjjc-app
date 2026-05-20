import type { Metadata } from "next";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { PageSection } from "@/components/page-section";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  const items = [
    { icon: MapPin, label: "Address", value: "2120 Jimmy Durante Blvd Ste. 121, Del Mar, CA 92014" },
    { icon: Phone, label: "Phone", value: "(858) 265-8982", href: "tel:+18582658982" },
    { icon: Globe, label: "Website", value: "www.delmarjiujitsuclub.com", href: "https://www.delmarjiujitsuclub.com" },
    { icon: Mail, label: "Email", value: "info@delmarjiujitsuclub.com", href: "mailto:info@delmarjiujitsuclub.com" }
  ];

  return (
    <PageSection eyebrow="Help" title="Contact the Academy">
      <p className="mb-6 max-w-2xl text-lg font-medium leading-8 text-academy-mist">
        Questions about the Community Hub? Contact the academy and we'll help you out.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map(({ icon: Icon, label, value, href }) => (
          <article key={label} className="rounded-3xl border border-academy-line/10 bg-academy-card/[.055] p-5">
            <Icon className="text-academy-blue" size={28} aria-hidden="true" />
            <h2 className="mt-4 text-sm font-black uppercase tracking-[.16em] text-academy-muted">{label}</h2>
            {href ? (
              <a className="mt-2 block text-xl font-black leading-8 text-academy-foreground hover:text-academy-blue" href={href}>{value}</a>
            ) : (
              <p className="mt-2 text-xl font-black leading-8 text-academy-foreground">{value}</p>
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
