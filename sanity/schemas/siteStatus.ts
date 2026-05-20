import { defineField, defineType } from "sanity";

export const siteStatus = defineType({
  name: "siteStatus",
  title: "Site Status",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "statusType",
      title: "Status Type",
      type: "string",
      options: {
        list: ["Open", "Closed", "Modified Schedule", "Event Day", "Holiday Closure"],
        layout: "radio"
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "message", title: "Message", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "updatedAt", title: "Updated At", type: "datetime", validation: (Rule) => Rule.required() })
  ],
  preview: {
    select: { title: "title", subtitle: "statusType" }
  }
});
