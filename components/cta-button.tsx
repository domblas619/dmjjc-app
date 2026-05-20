import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function CtaButton({ href, children, variant = "primary" }: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-base font-black transition active:scale-[.98]",
        variant === "primary"
          ? "bg-academy-blue text-academy-black shadow-glow hover:bg-sky-300"
          : "border border-academy-line/15 bg-academy-card/[.08] text-academy-foreground hover:border-academy-blue/50 hover:text-academy-blue"
      )}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
