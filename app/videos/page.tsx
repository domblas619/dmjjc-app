import type { Metadata } from "next";
import { Badge } from "@/components/badge";
import { PageSection } from "@/components/page-section";
import { VideoLibrary } from "@/components/video-library";
import { getVideos } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Videos"
};

export const revalidate = 60;

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <PageSection
      eyebrow="Study / Movement"
      title="Training Resource"
      description="Movement, drills, and study material for students."
      tone="dark"
    >
      <div className="mb-8 border border-academy-blue/35 bg-academy-blue/[.08] p-5">
        <Badge tone="blue">V1 Access</Badge>
        <p className="mt-3 max-w-3xl text-lg font-bold leading-8 text-academy-foreground">
          V1 video access is public while we test the Community Hub. Member-only access will be added in a future version.
        </p>
      </div>
      <VideoLibrary videos={videos} />
    </PageSection>
  );
}
