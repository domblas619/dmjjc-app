# Del Mar Jiu-Jitsu Club Community Hub

A mobile-first public Community Hub for Del Mar Jiu-Jitsu Club. V1 shows academy status, announcements, closures, upcoming events, and a public video library with Sanity CMS support and local fallback content.

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

The app works without Sanity environment variables. If Sanity is not configured, it uses the placeholder status, announcements, events, and videos in `lib/fallback-data.ts`.

## Sanity Setup

1. Create a Sanity project at `https://www.sanity.io`.
2. Add the project ID and dataset to `.env.local`.
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
5. Create at least one `siteStatus` document and publish announcements, events, and videos.

Example `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-20
```

## Content Editing

In Sanity Studio, editors can update:

- Announcements: title, slug, published date, category, body, image, featured flag
- Events: title, slug, start/end date, time, location, event type, description, image, featured flag
- Videos: title, slug, description, category, level, thumbnail, embedded video URL, featured flag, published date
- Site status: title, status type, message, updated date

For video embeds, use an embeddable URL such as a YouTube `/embed/` URL.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Add the Sanity environment variables in Vercel Project Settings.
4. Deploy.

If the Sanity variables are missing, the deployed app will still render fallback content.

## Structure

- `app/` - Next.js routes and metadata
- `components/` - reusable navigation, hero, cards, badges, buttons, and sections
- `lib/fallback-data.ts` - local placeholder content
- `lib/sanity/` - Sanity client and GROQ query helpers with fallback support
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
- Multi-academy white-label support
