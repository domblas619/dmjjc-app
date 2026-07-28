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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]/95 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="tap-spring absolute right-4 top-[max(1rem,env(safe-area-inset-top))] grid size-12 place-items-center border border-academy-line/20 bg-academy-ink/80 text-academy-foreground hover:border-academy-blue hover:text-academy-blue"
            aria-label="Close image"
          >
            <X size={22} aria-hidden="true" />
          </button>
          <div
            className="relative h-[min(78vh,52rem)] w-full max-w-5xl overflow-hidden border border-academy-line/15 bg-academy-black shadow-2xl shadow-black/60"
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
