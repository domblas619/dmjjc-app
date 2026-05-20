import type { Metadata } from "next";
import { Badge } from "@/components/badge";
import { PageSection } from "@/components/page-section";
import { VideoCard } from "@/components/video-card";
import { getVideos } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Videos"
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <PageSection eyebrow="Training Library" title="Public Videos">
      <div className="mb-6 rounded-3xl border border-academy-blue/30 bg-academy-blue/10 p-5">
        <Badge tone="blue">V1 Access</Badge>
        <p className="mt-3 text-lg font-bold leading-8 text-academy-foreground">
          V1 video access is public while we test the Community Hub. Member-only access will be added in a future version.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => <VideoCard key={video.slug} video={video} />)}
      </div>
    </PageSection>
  );
}
