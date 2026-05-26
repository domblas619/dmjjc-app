import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/badge";
import { PageSection } from "@/components/page-section";
import { VideoCard } from "@/components/video-card";
import { getVideoBySlug, getVideos } from "@/lib/sanity/queries";

type VideoPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

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
  const showCta = video.showCta ?? Boolean(video.ctaLabel && video.ctaUrl);

  return (
    <>
      <PageSection eyebrow={video.category} title={video.title}>
        <div className="overflow-hidden border border-academy-line/10 bg-academy-black">
          <div className="aspect-video bg-black">
            <iframe
              className="size-full"
              src={video.videoUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="border-t border-academy-line/10 p-5 md:p-7">
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">{video.category}</Badge>
              <Badge>{video.level}</Badge>
            </div>
            <p className="mt-5 text-lg font-medium leading-8 text-academy-mist">{video.description}</p>
            {showCta && video.ctaLabel && video.ctaUrl && (
              <Link
                href={video.ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-12 items-center gap-2 border-b-2 border-academy-blue text-sm font-black uppercase tracking-[.14em] text-academy-blue transition hover:text-academy-foreground"
              >
                {video.ctaLabel}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            )}
            <div className="mt-6 border-l-4 border-academy-blue bg-academy-blue/[.08] p-4 text-base font-bold leading-7 text-academy-foreground">
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
