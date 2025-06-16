import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import ScheduleTimeline from './components/ScheduleTimeline'

const API_KEY = import.meta.env.VITE_GCAL_API_KEY
const CAL_IDS = import.meta.env.VITE_CALENDAR_IDS.split(',')

function App() {
  const [eventsByCal, setEventsByCal] = useState({})

  useEffect(() => {
    const fetchEvents = async () => {
      const start = dayjs().startOf('day').toISOString()
      const end = dayjs().endOf('day').toISOString()
      const results = {}

      await Promise.all(
        CAL_IDS.map(async (calId) => {
          const url = `https://www.googleapis.com/calendar/v3/calendars/${calId}/events?timeMin=${start}&timeMax=${end}&singleEvents=true&orderBy=startTime&key=${API_KEY}`
          const res = await fetch(url)
          const data = await res.json()
          results[calId] = data.items || []
        })
      )

      setEventsByCal(results)
    }
    fetchEvents()
  }, [])

  return (
    <div className="container mx-auto p-4 grid grid-cols-3 gap-6">
      {CAL_IDS.map((calId, idx) => (
        <div key={calId} className="card bg-base-100 shadow-lg p-4">
          <h2 className="card-title">Space {idx + 1}</h2>
          <ScheduleTimeline events={eventsByCal[calId] || []} />
        </div>
      ))}
    </div>
  )
}

export default App
