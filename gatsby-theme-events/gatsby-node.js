const fs = require('fs')

// 1. make sure data folder exists!
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data'

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory...`)
    fs.mkdirSync(contentPath)
  }
}

// 2. define the event type
// keys startDate and endDate need to be transformed from Pascal case used in yaml
// slug is the url to our site which will be added in step 3
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
	type Event implements Node @dontInfer {
		id: ID!
		name: String!
		location: String!
		startDate: Date! @dateformat @proxy(from: "start_date")
		endDate: Date! @dateformat @proxy(from: "end_date")
		url: String!
		slug: String!
	}`)
}

// 3. define resolvers for any custom field (slug)
exports.createResolvers = ({ createResolvers }) => {
  const basePath = '/'
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/')
  }

  createResolvers({
    Event: {
      slug: {
        resolve: source => slugify(source.name)
      }
    }
  })
}

// 4. query for event and create pages