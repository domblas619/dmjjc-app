import { cn } from "@/lib/utils";

type PageSectionProps = {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function PageSection({ eyebrow, title, children, className }: PageSectionProps) {
  return (
    <section className={cn("mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-12", className)}>
      {(eyebrow || title) && (
        <div className="mb-5">
          {eyebrow && <p className="mb-2 text-sm font-black uppercase tracking-[.16em] text-academy-blue">{eyebrow}</p>}
          {title && <h2 className="text-3xl font-black leading-tight text-academy-foreground md:text-5xl">{title}</h2>}
        </div>
      )}
      {children}
    </section>
  );
}
