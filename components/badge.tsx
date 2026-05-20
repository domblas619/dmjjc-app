import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "neutral";
  className?: string;
};

const tones = {
  blue: "border-academy-blue/40 bg-academy-blue/[.15] text-academy-blue",
  green: "border-emerald-400/40 bg-emerald-400/[.15] text-emerald-200",
  amber: "border-amber-300/50 bg-amber-300/[.15] text-amber-100",
  red: "border-red-400/50 bg-red-500/[.15] text-red-100",
  neutral: "border-academy-line/15 bg-academy-card/[.08] text-academy-mist"
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide", tones[tone], className)}>
      {children}
    </span>
  );
}
