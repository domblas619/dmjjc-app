"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { VideoCard } from "@/components/video-card";
import type { Video, VideoCategory, VideoLevel } from "@/lib/types";

const categoryFilters: Array<VideoCategory | "All"> = [
  "All",
  "Kids",
  "Adults",
  "Fundamentals",
  "Drills",
  "At-Home Training",
  "No-Gi"
];

const levelFilters: Array<VideoLevel | "All"> = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];

export function VideoLibrary({ videos }: { videos: Video[] }) {
  const [category, setCategory] = useState<VideoCategory | "All">("All");
  const [level, setLevel] = useState<VideoLevel | "All">("All");
  const [search, setSearch] = useState("");

  const filteredVideos = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return videos.filter((video) => {
      const matchesCategory = category === "All" || video.category === category;
      const matchesLevel = level === "All" || video.level === level;
      const matchesSearch =
        !normalizedSearch ||
        `${video.title} ${video.description} ${video.category} ${video.level}`.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [category, level, search, videos]);

  return (
    <div className="space-y-7">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="block">
          <span className="text-xs font-black uppercase tracking-[.18em] text-academy-muted">Search videos</span>
          <span className="mt-2 flex min-h-14 items-center gap-3 border border-academy-line/15 bg-academy-panel px-4 text-academy-foreground focus-within:border-academy-blue">
            <Search size={19} className="text-academy-blue" aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search drills, movement, no-gi..."
              className="w-full bg-transparent text-base font-bold text-academy-foreground outline-none placeholder:text-academy-muted"
            />
          </span>
        </label>
        <p className="text-sm font-black uppercase tracking-[.14em] text-academy-muted">
          {filteredVideos.length} of {videos.length} videos
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-black uppercase tracking-[.18em] text-academy-muted">Category</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categoryFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setCategory(filter)}
              className={`shrink-0 border px-4 py-3 text-xs font-black uppercase tracking-[.16em] transition ${
                category === filter
                  ? "border-academy-blue bg-academy-blue text-[#05080c]"
                  : "border-academy-line/15 bg-transparent text-academy-foreground hover:border-academy-blue hover:text-academy-blue"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-black uppercase tracking-[.18em] text-academy-muted">Level</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {levelFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setLevel(filter)}
              className={`shrink-0 border px-4 py-3 text-xs font-black uppercase tracking-[.16em] transition ${
                level === filter
                  ? "border-academy-blue bg-academy-blue text-[#05080c]"
                  : "border-academy-line/15 bg-transparent text-academy-foreground hover:border-academy-blue hover:text-academy-blue"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {filteredVideos.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => <VideoCard key={video.slug} video={video} />)}
        </div>
      ) : (
        <div className="border border-academy-line/10 bg-academy-panel p-5">
          <p className="text-base font-bold leading-7 text-academy-mist">No videos match those filters yet.</p>
        </div>
      )}
    </div>
  );
}
