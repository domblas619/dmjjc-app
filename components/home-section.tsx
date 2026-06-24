import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type HomeSectionProps = {
  id?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  tone?: "dark" | "warm";
  children: React.ReactNode;
};

const tones = {
  dark: "border-academy-line/10 bg-[var(--deep-ocean)] [--academy-foreground:248_247_243] [--academy-muted:156_167_176] [--academy-line:255_255_255] [--academy-panel:17_24_32]",
  warm: "border-black/10 bg-[var(--warm-white)] [--academy-foreground:5_8_12] [--academy-muted:74_86_98] [--academy-line:0_0_0] [--academy-panel:255_255_255]"
};

export function HomeSection({ id, title, description, actionHref, actionLabel, tone = "dark", children }: HomeSectionProps) {
  const isExternalAction = actionHref?.startsWith("http");

  return (
    <section id={id} className={cn("border-t", tones[tone])}>
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-black uppercase leading-none text-academy-foreground md:text-4xl">{title}</h2>
            {description && <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-academy-mist md:text-base">{description}</p>}
          </div>
          {actionHref && actionLabel && (
            <Link
              href={actionHref}
              target={isExternalAction ? "_blank" : undefined}
              rel={isExternalAction ? "noreferrer" : undefined}
              className="tap-spring inline-flex min-h-10 shrink-0 items-center gap-2 border-b-2 border-academy-blue text-xs font-black uppercase tracking-[.14em] text-academy-blue hover:text-academy-foreground"
            >
              {actionLabel}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
