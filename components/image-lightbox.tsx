"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  children: ReactNode;
};

export function ImageLightbox({ src, alt, children }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group/image block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academy-blue"
        aria-label={`Open image: ${alt}`}
      >
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]/96 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(max(1rem,env(safe-area-inset-top))+4.25rem)] backdrop-blur-md sm:p-8 sm:pt-[calc(max(1.5rem,env(safe-area-inset-top))+4.75rem)]"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-x-0 top-0 border-b border-academy-line/15 bg-[#05070a]/90 px-4 pb-3 pt-[calc(max(1rem,env(safe-area-inset-top))+.75rem)] shadow-2xl shadow-black/40">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
              <p className="min-w-0 truncate text-xs font-black uppercase tracking-[.16em] text-academy-muted">
                {alt}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="tap-spring inline-flex min-h-11 shrink-0 items-center gap-2 border border-academy-blue bg-academy-blue px-4 text-xs font-black uppercase tracking-[.14em] text-[#05070a] shadow-lg shadow-academy-blue/20 hover:bg-academy-foreground hover:text-[#05070a]"
                aria-label="Close image"
              >
                Close
                <X size={18} strokeWidth={3} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            className="relative h-[min(74vh,52rem)] w-full max-w-5xl overflow-hidden border border-academy-line/15 bg-academy-black shadow-2xl shadow-black/60"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
