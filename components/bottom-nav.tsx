import { NavLinks } from "@/components/nav-links";

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line/10 bg-academy-black/[.94] px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-md grid-cols-5">
        <NavLinks mobile />
      </div>
    </nav>
  );
}
