import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
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
    defineField({name: 'startDate', title: 'Start Date', type: 'date', validation: (Rule) => Rule.required()}),
    defineField({name: 'endDate', title: 'End Date', type: 'date'}),
    defineField({name: 'time', title: 'Time', type: 'string'}),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Del Mar Jiu-Jitsu Club',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: ['Closure', 'Holiday', 'Tournament', 'In-House Event', 'Seminar', 'Special Schedule'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'isFeatured', title: 'Featured', type: 'boolean', initialValue: false}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eventType', media: 'image'},
  },
})
