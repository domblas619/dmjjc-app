import Link from "next/link";
import { Waves } from "lucide-react";
import { NavLinks } from "@/components/nav-links";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-academy-black/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-academy-blue text-academy-black">
            <Waves size={22} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-black leading-none text-white">Del Mar Jiu-Jitsu Club</span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[.18em] text-academy-blue">Community Hub</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
