import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { Badge } from "@/components/badge";
import type { Video } from "@/lib/types";

export function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/videos/${video.slug}`} className="group block overflow-hidden border border-academy-line/10 bg-academy-panel transition hover:border-academy-blue/70">
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
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{video.category}</Badge>
          <Badge>{video.level}</Badge>
        </div>
        <h3 className="mt-4 font-display text-2xl font-black uppercase leading-[.95] text-academy-foreground transition group-hover:text-academy-blue sm:text-3xl">{video.title}</h3>
        <p className="mt-3 text-base font-medium leading-7 text-academy-mist">{video.description}</p>
      </div>
    </Link>
  );
}
