import {defineField, defineType} from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Kids', 'Adults', 'Fundamentals', 'Drills', 'At-Home Training', 'No-Gi'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'videoUrl',
      title: 'Embedded Video URL',
      type: 'url',
      description: 'Use an embeddable URL, such as a YouTube /embed/ URL.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'isFeatured', title: 'Featured', type: 'boolean', initialValue: false}),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Optional. Example: Download Notes, View Form, Learn More.',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button URL',
      type: 'url',
      description: 'Optional. Add the destination URL for the button.',
      hidden: ({document}) => !document?.ctaLabel,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'thumbnail'},
  },
})
