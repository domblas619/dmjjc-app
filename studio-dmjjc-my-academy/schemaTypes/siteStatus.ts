import {defineField, defineType} from 'sanity'

export const siteStatus = defineType({
  name: 'siteStatus',
  title: 'Site Status',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'statusType',
      title: 'Status Type',
      type: 'string',
      options: {
        list: ['Closed', 'Modified Schedule', 'Event Day', 'Holiday Closure'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Starts At',
      type: 'datetime',
      description: 'When this status should begin showing.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      description:
        'Optional. If blank, this status automatically stops showing at midnight the next day.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'statusType'},
  },
})
