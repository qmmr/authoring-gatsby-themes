import React from 'react'

const EventTemplate = ({ name, url, startDate, endDate, location, slug }) => (
  <>
    <h1>
      {name} ({location})
    </h1>
    <p>
      {startDate} - {endDate}
    </p>
    <p>
      Website: <a href={url}>{url}</a>
    </p>
  </>
)

export default EventTemplate
