import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const defaultProjectId = "z48r70x2";
const defaultDataset = "production";
const defaultApiVersion = "2026-05-20";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || defaultProjectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || defaultDataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || defaultApiVersion,
  useCdn: false,
  perspective: "published" as const
};

export const hasSanityConfig = Boolean(sanityConfig.projectId && sanityConfig.dataset);

export const client = createClient({
  ...sanityConfig
});

export const urgentClient = client.withConfig({
  useCdn: false,
  perspective: "published"
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: unknown) {
  return builder.image(source as never);
}
