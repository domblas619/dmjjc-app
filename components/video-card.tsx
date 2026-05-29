import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Badge } from "@/components/badge";
import type { Video } from "@/lib/types";

export function VideoCard({ video }: { video: Video }) {
  const showCta = video.showCta ?? Boolean(video.ctaLabel && video.ctaUrl);

  return (
    <article className="group overflow-hidden border border-academy-line/10 bg-academy-panel transition hover:border-academy-blue/70">
      <Link href={`/videos/${video.slug}`} className="tap-spring block">
        <div className="relative aspect-video overflow-hidden bg-academy-charcoal">
          {video.thumbnail ? (
            <Image src={video.thumbnail} alt="" fill className="object-cover opacity-75 transition group-hover:scale-105 group-hover:opacity-90" sizes="(min-width: 768px) 33vw, 100vw" />
          ) : (
            <div className="media-frame size-full" />
          )}
          <span className="absolute inset-0 grid place-items-center bg-academy-black/20">
            <PlayCircle className="text-academy-blue" size={54} aria-hidden="true" />
          </span>
        </div>
      </Link>
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{video.category}</Badge>
          <Badge>{video.level}</Badge>
        </div>
        <Link href={`/videos/${video.slug}`} className="block">
          <h3 className="mt-4 font-display text-2xl font-black uppercase leading-[.95] text-academy-foreground transition group-hover:text-academy-blue sm:text-3xl">{video.title}</h3>
        </Link>
        <p className="mt-3 text-base font-medium leading-7 text-academy-mist">{video.description}</p>
        {showCta && video.ctaLabel && video.ctaUrl && (
          <Link
            href={video.ctaUrl}
            target="_blank"
            rel="noreferrer"
            className="tap-spring mt-5 inline-flex min-h-11 items-center gap-2 border-b-2 border-academy-blue text-sm font-black uppercase tracking-[.14em] text-academy-blue hover:text-academy-foreground"
          >
            {video.ctaLabel}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
