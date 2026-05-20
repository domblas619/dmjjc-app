import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-20",
  useCdn: true
};

export const hasSanityConfig = Boolean(sanityConfig.projectId && sanityConfig.dataset);

export const client = createClient({
  ...sanityConfig,
  projectId: sanityConfig.projectId || "placeholder",
  dataset: sanityConfig.dataset || "production"
});

const builder = imageUrlBuilder(client);

export function urlFor(source: unknown) {
  return builder.image(source as never);
}
