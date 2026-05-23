# Del Mar Jiu-Jitsu Club Community Hub

A mobile-first public Community Hub for Del Mar Jiu-Jitsu Club. V1 shows academy status, pinned and expiring announcements, closures, upcoming events, quick contact actions, and a public searchable video library with Sanity CMS support and local fallback content.

V1 intentionally does not include member login, signup, payments, Stripe verification, protected routes, Supabase, user accounts, or admin approval.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity CMS with `@sanity/client`
- PWA-friendly metadata and web manifest
- Vercel-ready deployment

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

The app includes the Del Mar Jiu-Jitsu Club Sanity project as its default CMS source, so local and Vercel builds stay connected even if optional Sanity environment variables are missing.

## Sanity Setup

1. Use the included Sanity project `z48r70x2` with dataset `production`.
2. Optional: add the project ID and dataset to `.env.local` if you need to override the defaults.
3. Run the included local Sanity Studio when you want to edit content:

```bash
cd studio-dmjjc-my-academy
npm install
npm run dev
```

Or from the app root:

```bash
npm run studio:dev
```

4. Use the schemas in `studio-dmjjc-my-academy/schemaTypes` for:
   - `announcement`
   - `event`
   - `video`
   - `siteStatus`
5. Publish announcements, events, and videos as needed. The app defaults Today’s Status to “Open - Regular Schedule”; create `siteStatus` documents only for exceptions such as closures, holidays, event days, or modified schedules.

Optional `.env.local` overrides:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=z48r70x2
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-20
SANITY_REVALIDATE_SECRET=use_a_long_random_secret
```

## Live Content Updates

Published Sanity content updates the live Vercel app without a manual redeploy.

The app uses two layers:

- Normal content pages revalidate automatically about every 60 seconds.
- A protected revalidation endpoint lets Sanity refresh the affected pages immediately after publish.

Add this environment variable locally and in Vercel:

```bash
SANITY_REVALIDATE_SECRET=use_a_long_random_secret
```

Create a Sanity webhook:

```text
POST https://your-vercel-domain.com/api/revalidate
Authorization: Bearer your_sanity_revalidate_secret
```

Use this webhook projection:

```groq
{
  "_type": _type
}
```

When Studio publishes:

- `announcement` refreshes `/` and `/updates`
- `event` refreshes `/` and `/events`
- `video` refreshes `/videos`
- `siteStatus` refreshes `/`

Code changes, schema changes, dependency changes, and environment variable changes still require a normal Vercel deploy.

## Content Editing

In Sanity Studio, editors can update:

- Announcements: title, slug, published date, category, body, image, featured flag, pinned notice flag, optional expiration date
- Events: title, slug, start/end date, time, location, event type, description, optional audience, optional status badge, optional registration/details URL, image, featured flag
- Videos: title, slug, description, category, level, thumbnail, embedded video URL, featured flag, published date
- Site status: title, status type, message, updated date

For video embeds, use an embeddable URL such as a YouTube `/embed/` URL.

Pinned announcements appear first. Announcements with an expiration date disappear from the live app after that date without a redeploy.

Today’s Status shows “Open - Regular Schedule” by default. Publish a `siteStatus` document only when the academy has an exception, such as a closure, holiday closure, event day, or modified schedule.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Add the Sanity environment variables in Vercel Project Settings.
4. Deploy.
5. Add the Sanity webhook above so Studio publishes refresh the live pages immediately.

If the Sanity variables are missing, the deployed app will still render empty states instead of public-facing demo content.

## Structure

- `app/` - Next.js routes and metadata
- `components/` - reusable navigation, hero, cards, badges, buttons, and sections
- `lib/fallback-data.ts` - non-demo empty fallback data for missing CMS configuration
- `lib/sanity/` - Sanity client and GROQ query helpers with fallback support
- `lib/push/` - web push storage and sending helpers
- `public/sw.js` - service worker for push notification display and notification clicks
- `studio-dmjjc-my-academy/` - standalone Sanity Studio for project `z48r70x2`
- `studio-dmjjc-my-academy/schemaTypes/` - CMS schema definitions
- `public/manifest.webmanifest` - PWA manifest

## Future Phases

- Member login
- Stripe active-member verification
- Manual access request approval
- Protected video library
- Admin/moderator dashboard
- Member roles
- Coach-only content
- Parent-only announcements
- Optional push notifications
- Multi-academy white-label support
