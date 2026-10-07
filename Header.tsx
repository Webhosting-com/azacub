'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Wordmark from './Wordmark'

const items = [
  { href: '/', label: 'News', match: (p: string) => p === '/' || p.startsWith('/news') },
  { href: '/team', label: 'Join the team', match: (p: string) => p.startsWith('/team') },
  { href: '/members', label: 'Members', match: (p: string) => p.startsWith('/members') },
]

export default function Header() {
  const path = usePathname()
  return (
    <header className="bar wrap">
      <Link href="/" aria-label="AZACUB home"><Wordmark /></Link>
      <nav className="nav" aria-label="Main">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className="navlink" aria-current={i.match(path) ? 'page' : undefined}>{i.label}</Link>
        ))}
      </nav>
      <Link className="btn solid" href="/join">Join the community</Link>
    </header>
  )
}
