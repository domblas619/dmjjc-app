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
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
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
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      description: 'Optional. After this date, the app will stop showing the announcement.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Optional. Example: Submit a Nomination, RSVP, Learn More.',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button URL',
      type: 'url',
      description: 'Optional. Add the destination URL for the button, such as a Google Form.',
      hidden: ({document}) => !document?.ctaLabel,
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
