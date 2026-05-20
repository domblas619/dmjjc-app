import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "neutral";
  className?: string;
};

const tones = {
  blue: "border-academy-blue bg-academy-blue text-academy-black",
  green: "border-emerald-300 bg-emerald-300 text-emerald-950",
  amber: "border-amber-300 bg-amber-300 text-amber-950",
  red: "border-red-300 bg-red-300 text-red-950",
  neutral: "border-academy-line/30 bg-academy-foreground text-academy-black"
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center border px-3 py-1 text-[11px] font-black uppercase tracking-[.18em]", tones[tone], className)}>
      {children}
    </span>
  );
}
