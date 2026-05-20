import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { Badge } from "@/components/badge";
import type { Video } from "@/lib/types";

export function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/videos/${video.slug}`} className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[.055] transition hover:-translate-y-1 hover:border-academy-blue/40 hover:bg-white/[.08]">
      <div className="relative aspect-video overflow-hidden bg-academy-charcoal">
        {video.thumbnail ? (
          <Image src={video.thumbnail} alt="" fill className="object-cover opacity-75 transition group-hover:scale-105 group-hover:opacity-90" sizes="(min-width: 768px) 33vw, 100vw" />
        ) : (
          <div className="media-frame size-full" />
        )}
        <span className="absolute inset-0 grid place-items-center bg-academy-black/20">
          <PlayCircle className="text-academy-blue drop-shadow" size={54} aria-hidden="true" />
        </span>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{video.category}</Badge>
          <Badge>{video.level}</Badge>
        </div>
        <h3 className="mt-4 text-2xl font-black leading-tight text-white">{video.title}</h3>
        <p className="mt-3 text-base font-medium leading-7 text-academy-mist">{video.description}</p>
      </div>
    </Link>
  );
}
