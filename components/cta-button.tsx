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
        "tap-spring inline-flex min-h-12 items-center justify-center gap-2 border px-5 text-sm font-black uppercase tracking-[.12em]",
        variant === "primary"
          ? "border-academy-blue bg-academy-blue text-[#05080c] hover:bg-transparent hover:text-academy-blue"
          : "border-academy-line/20 bg-transparent text-academy-foreground hover:border-academy-blue hover:text-academy-blue"
      )}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
