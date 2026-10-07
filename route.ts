import { NextResponse } from 'next/server'
import { isConfigured } from '@/sanity/env'
import { writeClient, writeToken } from '@/sanity/server'

const FIELDS = {
  community: { required: ['name', 'email', 'instagram', 'role', 'location', 'link'], optional: ['specialism', 'now'], type: 'application' },
  team: { required: ['name', 'email', 'skills', 'how'], optional: ['time', 'link'], type: 'teamApplication' },
} as const

const clean = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isUrl = (v: string) => { try { return ['http:', 'https:'].includes(new URL(v).protocol) } catch { return false } }

export async function POST(req: Request) {
  if (!isConfigured || !writeToken) {
    return NextResponse.json({ error: 'Applications are not open yet. Please try again soon.' }, { status: 503 })
  }
  let data: Record<string, unknown>
  try { data = await req.json() } catch { return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 400 }) }

  // Hidden field that real people never fill in. Bots do, and are quietly ignored.
  if (clean(data.website)) return NextResponse.json({ ok: true })

  const kind = data.kind === 'team' ? 'team' : 'community'
  const spec = FIELDS[kind]
  const doc: Record<string, string> = {}
  for (const f of spec.required) {
    doc[f] = clean(data[f])
    if (!doc[f]) return NextResponse.json({ error: 'Please fill in every required field.' }, { status: 400 })
  }
  for (const f of spec.optional) { const v = clean(data[f]); if (v) doc[f] = v }
  if (!isEmail(doc.email)) return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 })
  if (doc.link && !isUrl(doc.link)) return NextResponse.json({ error: 'The link needs to start with https://' }, { status: 400 })
  if (kind === 'community' && data.consent !== true) return NextResponse.json({ error: 'Please tick the newsletter box to apply.' }, { status: 400 })

  try {
    await writeClient.create({
      _type: spec.type,
      ...doc,
      ...(kind === 'community' ? { status: 'new' } : {}),
      submittedAt: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Could not save application', err)
    return NextResponse.json({ error: 'We could not save that just now. Please try again in a moment.' }, { status: 502 })
  }
}
