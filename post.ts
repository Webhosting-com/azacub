import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Feature',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Headline', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Web address', description: 'Press Generate. This becomes the end of the page link.', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Music', 'Visuals', 'Production', 'Spotlight', 'Events'] }, initialValue: 'Music' }),
    defineField({ name: 'standfirst', title: 'Standfirst', description: 'One or two sentences under the headline.', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', title: 'Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'lead', title: 'Make this the lead feature', description: 'The newest feature with this switched on shows large at the top of the home page.', type: 'boolean', initialValue: false }),
    defineField({
      name: 'mainImage', title: 'Main photo', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the photo', description: 'Read aloud to people using screen readers.', type: 'string' })],
    }),
    defineField({ name: 'body', title: 'Article', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'trackTitle', title: 'Featured track title', type: 'string' }),
    defineField({
      name: 'links', title: 'Links', description: 'Where to listen or follow, for example SoundCloud or Instagram.', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'url', title: 'Link', type: 'url', validation: (r) => r.required() }),
      ] }],
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'mainImage' } },
})
