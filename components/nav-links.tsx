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
          "inline-flex items-center gap-2 rounded-full font-bold transition",
          mobile ? "flex-col gap-1 px-2 py-2 text-[11px]" : "px-4 py-2 text-sm",
          active ? "bg-academy-blue text-academy-black" : "text-academy-mist hover:bg-white/[.08] hover:text-white"
        )}
      >
        <Icon size={mobile ? 20 : 17} aria-hidden="true" />
        {label}
      </Link>
    );
  });
}
