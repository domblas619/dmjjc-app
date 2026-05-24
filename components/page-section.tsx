import { cn } from "@/lib/utils";

type PageSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "dark" | "warm" | "transparent";
  children: React.ReactNode;
  className?: string;
};

const tones = {
  dark: "border-academy-line/10 bg-[var(--deep-ocean)] [--academy-foreground:248_247_243] [--academy-muted:156_167_176] [--academy-line:255_255_255] [--academy-card:255_255_255] [--academy-panel:17_24_32]",
  warm: "border-black/10 bg-[var(--warm-white)] [--academy-foreground:5_8_12] [--academy-muted:74_86_98] [--academy-line:0_0_0] [--academy-card:5_8_12] [--academy-panel:255_255_255]",
  transparent: "border-academy-line/10"
};

export function PageSection({ id, eyebrow, title, description, tone = "transparent", children, className }: PageSectionProps) {
  return (
    <section id={id} className={cn("border-t", tones[tone], className)}>
      <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-20">
        {(eyebrow || title || description) && (
          <div className="mb-9 grid gap-4 md:grid-cols-[.72fr_1.28fr] md:items-end">
            {eyebrow && <p className="text-xs font-black uppercase tracking-[.24em] text-academy-blue">{eyebrow}</p>}
            <div>
              {title && <h2 className="font-display text-[2.15rem] font-black uppercase leading-[.9] tracking-normal text-academy-foreground sm:text-5xl md:text-7xl">{title}</h2>}
              {description && <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-academy-mist md:text-lg">{description}</p>}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
