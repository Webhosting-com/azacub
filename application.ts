import { defineField, defineType } from 'sanity'

const status = defineField({
  name: 'status', title: 'Status', type: 'string',
  description: 'To approve someone: choose Approved, then press Publish. The welcome email is sent automatically, once.',
  options: { list: [{ title: 'New', value: 'new' }, { title: 'Approved', value: 'approved' }, { title: 'Declined', value: 'declined' }], layout: 'radio' },
  initialValue: 'new',
})

export const application = defineType({
  name: 'application',
  title: 'Community application',
  type: 'document',
  fields: [
    status,
    defineField({ name: 'name', title: 'Name or artist name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'string', readOnly: true }),
    defineField({ name: 'role', title: 'What they do', type: 'string', readOnly: true }),
    defineField({ name: 'specialism', title: 'Specialism', type: 'string', readOnly: true }),
    defineField({ name: 'location', title: 'Based in', type: 'string', readOnly: true }),
    defineField({ name: 'link', title: 'Link to their work', type: 'url', readOnly: true }),
    defineField({ name: 'now', title: 'Working on', type: 'text', readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Applied', type: 'datetime', readOnly: true }),
    defineField({ name: 'welcomeSentAt', title: 'Welcome email sent', type: 'datetime', readOnly: true }),
  ],
  orderings: [{ title: 'Newest first', name: 'new', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: {
    select: { name: 'name', role: 'role', status: 'status' },
    prepare: ({ name, role, status }) => ({ title: name || 'Unnamed', subtitle: `${(status || 'new').toUpperCase()} · ${role || ''}` }),
  },
})

export const teamApplication = defineType({
  name: 'teamApplication',
  title: 'Team application',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'skills', title: 'Skill set', type: 'string', readOnly: true }),
    defineField({ name: 'how', title: 'How they could contribute', type: 'text', readOnly: true }),
    defineField({ name: 'time', title: 'Time they could give', type: 'string', readOnly: true }),
    defineField({ name: 'link', title: 'Link to their work', type: 'url', readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Sent', type: 'datetime', readOnly: true }),
    defineField({ name: 'notes', title: 'Your notes', type: 'text' }),
  ],
  orderings: [{ title: 'Newest first', name: 'new', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: { select: { title: 'name', subtitle: 'skills' } },
})
