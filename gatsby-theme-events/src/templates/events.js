import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import EventsList from '../components/EventsList'

const EventsTemplate = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allEvent(sort: { fields: startDate, order: ASC }) {
          nodes {
            id
            name
            startDate
            endDate
            location
            url
            slug
          }
        }
      }
    `
  )
  const events = data.allEvent.nodes

  return (
    <Layout>
      <EventsList events={events} />
    </Layout>
  )
}

export default EventsTemplate
