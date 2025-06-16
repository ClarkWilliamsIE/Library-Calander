import React from 'react'
import dayjs from 'dayjs'

export default function ScheduleTimeline({ events }) {
  if (!events.length) return <p>No events today</p>

  return (
    <ul className="menu">
      {events.map((evt) => {
        const start = dayjs(evt.start.dateTime || evt.start.date).format('h:mm A')
        const end = dayjs(evt.end.dateTime || evt.end.date).format('h:mm A')
        return (
          <li key={evt.id} className="hover:bg-base-200">
            <span>{`${start}–${end}`}</span>
            <span className="font-semibold">{evt.summary}</span>
          </li>
        )
      })}
    </ul>
  )
}
