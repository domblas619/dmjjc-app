import { cn } from "@/lib/utils";

type PageSectionProps = {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function PageSection({ eyebrow, title, children, className }: PageSectionProps) {
  return (
    <section className={cn("mx-auto w-full max-w-6xl border-t border-academy-line/10 px-5 py-10 md:px-8 md:py-14", className)}>
      {(eyebrow || title) && (
        <div className="mb-7 grid gap-3 md:grid-cols-[.8fr_1.7fr] md:items-end">
          {eyebrow && <p className="mb-2 text-sm font-black uppercase tracking-[.16em] text-academy-blue">{eyebrow}</p>}
          {title && <h2 className="text-4xl font-black uppercase leading-[.9] tracking-normal text-academy-foreground md:text-6xl">{title}</h2>}
        </div>
      )}
      {children}
    </section>
  );
}
