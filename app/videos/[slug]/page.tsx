import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { PageSection } from "@/components/page-section";
import { VideoCard } from "@/components/video-card";
import { getVideoBySlug, getVideos } from "@/lib/sanity/queries";

type VideoPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  return { title: video?.title || "Video" };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const [video, videos] = await Promise.all([getVideoBySlug(slug), getVideos()]);
  if (!video) notFound();
  const related = videos.filter((item) => item.slug !== video.slug && item.category === video.category).slice(0, 3);

  return (
    <>
      <PageSection eyebrow={video.category} title={video.title}>
        <div className="overflow-hidden rounded-3xl border border-academy-line/10 bg-academy-black shadow-glow">
          <div className="aspect-video bg-black">
            <iframe
              className="size-full"
              src={video.videoUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="p-5 md:p-7">
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">{video.category}</Badge>
              <Badge>{video.level}</Badge>
            </div>
            <p className="mt-5 text-lg font-medium leading-8 text-academy-mist">{video.description}</p>
            <div className="mt-6 rounded-2xl border border-amber-300/40 bg-amber-300/10 p-4 text-base font-bold leading-7 text-amber-50">
              Practice with control. If you are unsure about a technique, ask a coach before drilling it at home.
            </div>
          </div>
        </div>
      </PageSection>
      {related.length > 0 && (
        <PageSection eyebrow="Keep Training" title="Related Videos">
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => <VideoCard key={item.slug} video={item} />)}
          </div>
        </PageSection>
      )}
    </>
  );
}
