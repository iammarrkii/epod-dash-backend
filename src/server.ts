require('dotenv').config()
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { resolvers, typeDefs } from './graphql'

import {
  fetchDelivery,
  fetchDriverLocation,
  fetchDriver,
  slowFetchDelivery,
  createDriver,
  createCustomer,
  createDelivery,
  userLogin,
  userInfo,
} from './helper'

const { authURI, PORT, EPOD_API_URI } = process.env

const startServer = async () => {
  const server = await new ApolloServer({
    typeDefs,
    resolvers,
    context: async (session) => ({
      fetchDelivery: async () =>
        fetchDelivery(session.req.headers.authorization),
      //slowFetchDelivery(session.req.headers.authorization),
      fetchDriverLocation: async () =>
        fetchDriverLocation(session.req.headers.authorization),
      fetchDriver: async () => fetchDriver(session.req.headers.authorization),
      createDriver: async () => createDriver(session.req.headers.authorization),
      createCustomer: async () =>
        createCustomer(session.req.headers.authorization),
      createDelivery: async () =>
        createDelivery(session.req.headers.authorization),
      userLogin: async () => userLogin(session.req.headers.authorization),
      userInfo: async () => userInfo(session.req.headers.authorization),
    }),
  })
  const app = express()
  const port = PORT || 5000
  server.applyMiddleware({ app })

  app.listen({ port: port }, () =>
    console.log(
      `🚀  Server ready at http://localhost:${port}${server.graphqlPath}`,
    ),
  )
}

startServer()
