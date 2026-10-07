'use client'
import { useState } from 'react'

const ROLES = ['Artist', 'Producer', 'Songwriter', 'Engineer', 'Photographer', 'Videographer', 'Designer', 'Stylist', 'Director', 'Manager', 'A&R', 'Something else']

export default function ApplyForm({ kind }: { kind: 'community' | 'team' }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setState('sending')
    const fd = new FormData(e.currentTarget)
    const data: Record<string, unknown> = { kind }
    fd.forEach((v, k) => { data[k] = typeof v === 'string' ? v : '' })
    data.consent = fd.get('consent') === 'on'
    try {
      const res = await fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.')
      setState('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setState('idle')
    }
  }

  if (state === 'done') {
    return (
      <div className="done" role="status">
        <h3>{kind === 'community' ? 'Application received.' : "Thanks. We've got it."}</h3>
        <p>{kind === 'community'
          ? "Every application is read by a person. If you're approved, you'll get an email with the groupchat link and your members' password."
          : "We'll be in touch if there's a fit."}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit}>
      {/* Hidden from people; catches bots. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="f"><label htmlFor="name">{kind === 'community' ? 'Name or artist name' : 'Name'}</label><input id="name" name="name" required autoComplete="name" /></div>
      <div className="f"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      {kind === 'community' ? (
        <>
          <div className="f"><label htmlFor="instagram">Instagram handle</label><input id="instagram" name="instagram" required placeholder="@" /></div>
          <div className="f"><label htmlFor="role">What you do</label>
            <select id="role" name="role" required defaultValue=""><option value="" disabled>Choose one</option>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>
          </div>
          <div className="f"><label htmlFor="specialism">Your specialism (optional)</label><input id="specialism" name="specialism" placeholder="For example: R&B vocalist, music video editor" /></div>
          <div className="f"><label htmlFor="location">Where you&apos;re based</label><input id="location" name="location" required /></div>
          <div className="f"><label htmlFor="link">A link to your work</label><input id="link" name="link" type="url" required placeholder="https://" /></div>
          <div className="f"><label htmlFor="now">What are you working on right now?</label><textarea id="now" name="now" /></div>
          <label className="check"><input type="checkbox" name="consent" required /><span>I understand that membership includes the AZACUB newsletter by email, and that I can unsubscribe at any time.</span></label>
        </>
      ) : (
        <>
          <div className="f"><label htmlFor="skills">Your skill set</label><input id="skills" name="skills" required placeholder="For example: writing, events, design, video, social" /></div>
          <div className="f"><label htmlFor="how">How could you contribute to building London&apos;s creative community?</label><textarea id="how" name="how" required /></div>
          <div className="f"><label htmlFor="time">Time you could give</label>
            <select id="time" name="time"><option>A few hours a month</option><option>A few hours a week</option><option>More than that</option></select>
          </div>
          <div className="f"><label htmlFor="link">A link to your work (optional)</label><input id="link" name="link" type="url" placeholder="https://" /></div>
        </>
      )}
      <div className="err" role="alert">{error}</div>
      <button className="btn solid" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : kind === 'community' ? 'Send application' : 'Send'}</button>
    </form>
  )
}
