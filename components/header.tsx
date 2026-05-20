import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-academy-line/10 bg-academy-black/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative block size-12 overflow-hidden bg-black">
            <Image
              src="/dmjjc-logo-icon.png"
              alt=""
              fill
              sizes="48px"
              className="object-contain p-1"
              priority
            />
          </span>
          <span>
            <span className="block text-base font-black leading-none text-academy-foreground">Del Mar Jiu-Jitsu Club</span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[.18em] text-academy-blue">Community Hub</span>
          </span>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-2" aria-label="Primary navigation">
            <NavLinks />
          </nav>
          <ThemeToggle />
        </div>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
