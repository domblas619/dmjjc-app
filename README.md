# Del Mar Jiu-Jitsu Club Community Hub

A mobile-first public Community Hub for Del Mar Jiu-Jitsu Club. V1 shows academy status, pinned and expiring announcements, closures, upcoming events, quick contact actions, opt-in push alerts, and a public searchable video library with Sanity CMS support and local fallback content.

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

## Push Notifications

The app includes public, opt-in web push alerts for urgent academy communication such as closures, holiday closures, modified schedules, and pinned urgent updates. Push notifications do not require member accounts.

Push requires:

- VAPID keys for browser push authentication
- Upstash Redis / Vercel Redis integration for storing device subscriptions
- A secret for protected notification sending

Add these environment variables locally and in Vercel:

```bash
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_vapid_key
VAPID_PRIVATE_KEY=your_private_vapid_key
VAPID_SUBJECT=mailto:info@delmarjiujitsuclub.com
PUSH_WEBHOOK_SECRET=use_a_long_random_secret
CRON_SECRET=use_a_long_random_secret
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

Vercel's Upstash integration may create `UPSTASH_REDIS_KV_REST_API_URL` and `UPSTASH_REDIS_KV_REST_API_TOKEN` instead. The app supports those names too.

The homepage shows an urgent alerts opt-in card. If push keys or Redis are missing, the app still runs and explains setup is needed.

To send a notification manually:

```bash
curl -X POST https://your-vercel-domain.com/api/push/send \
  -H "Authorization: Bearer $PUSH_WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"title":"Schedule Update","body":"Del Mar Jiu-Jitsu Club has a modified schedule today.","url":"/events","tag":"schedule-update"}'
```

Sanity can trigger push alerts with a webhook:

```text
POST https://your-vercel-domain.com/api/sanity/push
Authorization: Bearer your_push_webhook_secret
```

Use a Sanity webhook projection like:

```groq
{
  "_type": _type,
  "title": title,
  "body": body,
  "message": message,
  "description": description,
  "category": category,
  "eventType": eventType,
  "statusType": statusType,
  "isPinned": isPinned,
  "sendPushAlert": sendPushAlert
}
```

The webhook route sends notifications for content with `Send Push Alert` enabled. It also sends automatically for urgent content: closed/modified/event-day status updates, closure/holiday/special-schedule events, pinned announcements, and closure announcements.

Event and closure reminders are sent by GitHub Actions calling `/api/cron/reminders`:

- 12:00 PM Pacific the day before the event or closure
- 7:00 AM Pacific the morning of the event or closure

The reminder route checks Sanity events and stores sent reminder IDs in Upstash Redis so each reminder is only sent once. `CRON_SECRET` must be set in Vercel and as a GitHub Actions repository secret with the same value.

On iPhone, web push requires iOS/iPadOS 16.4 or newer and the app must be added to the Home Screen.

## Content Editing

In Sanity Studio, editors can update:

- Announcements: title, slug, published date, category, body, image, featured flag, pinned notice flag, send push alert toggle, optional expiration date
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
6. Add `CRON_SECRET` in Vercel Project Settings and GitHub Actions repository secrets so scheduled reminders can run securely.

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
- Multi-academy white-label support
