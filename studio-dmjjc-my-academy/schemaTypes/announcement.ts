import {defineField, defineType} from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Immediately At',
      type: 'datetime',
      description:
        'Used for immediate posts. For a future post, turn on Schedule for Later below.',
      initialValue: () => new Date().toISOString(),
      hidden: ({document}) => document?.scheduleForLater === true,
      validation: (Rule) => Rule.custom((value, context) =>
        context.document?.scheduleForLater || value ? true : 'Required for immediate posts',
      ),
    }),
    defineField({
      name: 'scheduleForLater',
      title: 'Schedule for Later',
      type: 'boolean',
      description: 'Publish this announcement and send its push alert at a future date and time.',
      initialValue: false,
    }),
    defineField({
      name: 'scheduleDate',
      title: 'Publish Date',
      type: 'date',
      hidden: ({document}) => document?.scheduleForLater !== true,
      validation: (Rule) => Rule.custom((value, context) =>
        !context.document?.scheduleForLater || value ? true : 'Choose a publish date',
      ),
    }),
    defineField({
      name: 'scheduleTime',
      title: 'Publish Time',
      type: 'string',
      description: 'Use 24-hour time, such as 06:00 for 6:00 AM or 18:00 for 6:00 PM.',
      placeholder: '06:00',
      hidden: ({document}) => document?.scheduleForLater !== true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!context.document?.scheduleForLater) return true
          if (!value) return 'Enter a publish time'
          return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value)) || 'Use HH:MM in 24-hour time'
        }),
    }),
    defineField({
      name: 'scheduleTimeZone',
      title: 'Scheduling Time Zone',
      type: 'string',
      description: 'Pacific Time is the academy’s local time. Hawaii Time follows your current local clock.',
      options: {
        list: [
          {title: 'Pacific Time — Del Mar', value: 'America/Los_Angeles'},
          {title: 'Hawaii Time', value: 'Pacific/Honolulu'},
        ],
        layout: 'radio',
      },
      initialValue: 'America/Los_Angeles',
      hidden: ({document}) => document?.scheduleForLater !== true,
      validation: (Rule) => Rule.custom((value, context) =>
        !context.document?.scheduleForLater || value ? true : 'Choose a scheduling time zone',
      ),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['General', 'Schedule', 'Closure', 'Event', 'Kids Program', 'Adults Program'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'isFeatured', title: 'Featured', type: 'boolean', initialValue: false}),
    defineField({
      name: 'isPinned',
      title: 'Pinned Notice',
      type: 'boolean',
      description: 'Pinned announcements appear first in the app.',
      initialValue: false,
    }),
    defineField({
      name: 'sendPushAlert',
      title: 'Send Push Alert',
      type: 'boolean',
      description:
        'Turn this on when publishing an announcement that should notify subscribed members.',
      initialValue: false,
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      description: 'Optional. After this date, the app will stop showing the announcement.',
    }),
    defineField({
      name: 'showCta',
      title: 'Show CTA Button',
      type: 'boolean',
      description: 'Turn this on to add a button/link to this announcement.',
      initialValue: false,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Example: Submit a Nomination, RSVP, Learn More.',
      hidden: ({document}) => !document?.showCta,
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button URL',
      type: 'url',
      description: 'Add the destination URL for the button, such as a Google Form.',
      hidden: ({document}) => !document?.showCta,
    }),
  ],
  preview: {
    select: {title: 'title', category: 'category', isPinned: 'isPinned', media: 'image'},
    prepare({title, category, isPinned, media}) {
      return {
        title,
        subtitle: `${isPinned ? 'Pinned · ' : ''}${category}`,
        media,
      }
    },
  },
})
