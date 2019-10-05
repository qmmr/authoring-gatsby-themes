import React from 'react'

// TODO: Change locale date string to Europe?
const getDate = (date, { day = true, month = true, year = true } = {}) =>
  date.toLocaleDateString('en-US', {
    day: day ? 'numeric' : undefined,
    month: month ? 'long' : undefined,
    year: year ? 'numeric' : undefined
  })

const EventDate = ({ startDate, endDate }) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const isOneDay = start.toDateString() === end.toDateString()

  return (
    <>
      <time dateTime={start.toISOString()}>{getDate(start, { year: isOneDay })}</time>
      {!isOneDay && (
        <>
          -<time dateTime={end.toISOString()}>{getDate(end, { month: start.getMonth() !== end.getMonth() })}</time>
        </>
      )}
    </>
  )
}

const EventTemplate = ({ name, url, startDate, endDate, location, slug }) => (
  <>
    <h1>
      {name} ({location})
    </h1>
    <p>
      <EventDate startDate={startDate} endDate={endDate} />
    </p>
    <p>
      Website: <a href={url}>{url}</a>
    </p>
  </>
)

export default EventTemplate
