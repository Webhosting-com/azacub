import type { Metadata } from 'next'
import ApplyForm from '@/components/ApplyForm'

export const metadata: Metadata = { title: 'Join the team', description: 'Help run AZACUB and build London\'s creative community.' }

const problems = [
  ['Get in', "London runs on who you know, and if you're not from here the doors stay shut. AZACUB opens them: a trusted network that brings you into the city's creative scene, wherever you're based."],
  ['Get seen', "Good work gets missed every day. We put our members' latest releases in front of the labels, creatives and industry people who should be hearing them."],
  ['Get connected', 'Stop scrolling YouTube for a producer. AZACUB links you straight to the people you need, from producers and vocalists to a videographer who fits your budget.'],
]

export default function Team() {
  return (
    <>
      <div className="wrap page-head">
        <div className="mono ember">For builders</div>
        <h1 className="h-serif">Join the team</h1>
        <p className="stand">Members are creatives building themselves. The team is the group building AZACUB. If you want to help run it, this is where to start.</p>
      </div>
      <div className="wrap rule sec cols">
        <div>
          <div className="mono mute" style={{ marginBottom: 8 }}>The problems we&apos;re solving</div>
          <div className="probs">
            {problems.map(([h, p]) => (<div className="prob" key={h}><h3>{h}</h3><p>{p}</p></div>))}
          </div>
        </div>
        <ApplyForm kind="team" />
      </div>
    </>
  )
}
