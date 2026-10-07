import Link from 'next/link'
import Wordmark from './Wordmark'

export default function Footer() {
  return (
    <footer className="wrap rule">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Wordmark />
        <span className="mono mute">Creative network / London</span>
      </div>
      <div className="foot-links mono">
        <a className="link" href="https://www.instagram.com/cubs.x" target="_blank" rel="noopener">Founded by Cubs</a>
        <Link className="link" href="/join">Join</Link>
        <Link className="link" href="/team">Team</Link>
      </div>
    </footer>
  )
}
