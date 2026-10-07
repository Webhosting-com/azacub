'use client'
import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London', // follows UK daylight saving automatically
  hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
})

export default function Clock() {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="clock">
      <span className="mute">London, UK</span>
      <span className="ember" suppressHydrationWarning>{time}</span>
    </span>
  )
}
