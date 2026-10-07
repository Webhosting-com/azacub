import { defineField, defineType } from 'sanity'

export const spotlight = defineType({
  name: 'spotlight',
  title: 'Member spotlight',
  type: 'document',
  description: 'The most recently edited spotlight is the one shown on the home page.',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'What they do', type: 'string' }),
    defineField({ name: 'location', title: 'Where they are based', type: 'string' }),
    defineField({ name: 'blurb', title: 'Why they are in the spotlight', type: 'text', rows: 3 }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'link', title: 'Link to their work', type: 'url' }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
