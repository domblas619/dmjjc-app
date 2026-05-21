"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, HelpCircle, Home, Megaphone, PlaySquare } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/updates", label: "Updates", icon: Megaphone },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/videos", label: "Videos", icon: PlaySquare },
  { href: "/contact", label: "Contact", icon: HelpCircle }
];

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  return links.map(({ href, label, icon: Icon }) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return (
      <Link
        key={href}
        href={href}
        className={cn(
          "relative inline-flex items-center gap-2 font-black uppercase tracking-[.12em] transition after:absolute after:bg-academy-blue after:transition",
          mobile
            ? "flex-col gap-1 px-2 py-2 text-[11px] after:inset-x-5 after:bottom-0 after:h-0.5"
            : "px-2 py-3 text-sm after:inset-x-2 after:bottom-1 after:h-0.5",
          active
            ? "text-academy-foreground after:opacity-100"
            : "text-academy-mist after:opacity-0 hover:text-academy-foreground hover:after:opacity-60"
        )}
      >
        <Icon size={mobile ? 20 : 17} aria-hidden="true" />
        {label}
      </Link>
    );
  });
}
