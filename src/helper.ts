const { createApolloFetch } = require('apollo-fetch')
import { execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
const { EPOD_API_URI } = process.env

require('dotenv').config()

//WARNING! fix this before PRD, include header in memo
let fetchDeliveryCache: { data: any; lastRefresh: any } = {
  data: undefined,
  lastRefresh: undefined,
}

export const slowFetchDelivery = (header) => {
  return new Promise((resolve, reject) => {
    setTimeout((header) => resolve(fetchDelivery(header)), 5000, header)
  })
}

export const fetchDelivery = async (header) => {
  //don't use cache that is more than 110 seconds old
  let useCache = false
  if (fetchDeliveryCache.data) {
    const cacheAge = Date.now() - fetchDeliveryCache.lastRefresh
    console.log('cache age', cacheAge)
    if (cacheAge > 110000) {
      useCache = false
    } else {
      useCache = true
    }
  }

  if (fetchDeliveryCache.data && useCache) {
    console.log('using fetchDeliveryCache', fetchDeliveryCache.lastRefresh)
    return fetchDeliveryCache.data
  }

  const uri = EPOD_API_URI || 'http://localhost:4000/graphql'
  const link = new HttpLink({ uri })
  const operation = {
    query: gql`
      query {
        allDeliverys {
          id
          scheduledDate
          scheduledTime
          delvStatus
          driver {
            id
            name
            plateNumber
            porter
          }
          items {
            id
            itemNumber
            material
            pricePerUnit
            uom
            qty
            pricePerUnit
            variance {
              id
              varianceQty
              reasonOfVariance
            }
            deliveryDateAndTime
          }
          customer {
            id
            name
            address {
              id
              fullAddress
              building_name
              street
              city
              state
              street
              zip_code
            }
          }
          shipmentNumber
          file {
            id
            path
          }
          trucker
        }
      }
    `,
    variables: {},
    context: {
      headers: {
        //Den auth
        Authorization: header,
        //Mark auth
        //Authorization: "Basic bWFyazoxMjM=",
      },
    },
  }

  const result: any = await makePromise(execute(link, operation))
    .then((data) => data)
    .catch((error) => error)
  return result.data
}

export const fetchDriver = async (header) => {
  const uri = EPOD_API_URI || 'http://localhost:4000/graphql'
  const link = new HttpLink({ uri })
  const operation = {
    query: gql`
      query {
        allDrivers {
          id
          name
          plateNumber
          porter
        }
      }
    `,
    variables: {},
    context: {
      headers: {
        //Den auth
        Authorization: header,
        //Mark auth
        //Authorization: "Basic bWFyazoxMjM=",
      },
    },
  }

  const result: any = await makePromise(execute(link, operation))
    .then((data) => data)
    .catch((error) => error)

  return result.data || result.error
}

export const fetchDriverLocation = async (header) => {
  const uri = EPOD_API_URI || 'http://localhost:4000/graphql'
  const link = new HttpLink({ uri })
  const operation = {
    query: gql`
      query {
        getDriverLocations {
          id
          timeStamp
          driverId
          latitude
          longitude
          mobileTimeStamp
          mobileMocked
          textAddress
        }
      }
    `,
    variables: {},
    context: {
      headers: {
        //Den auth
        Authorization: header,
        //Mark auth
        //Authorization: "Basic bWFyazoxMjM=",
      },
    },
  }

  const result: any = await makePromise(execute(link, operation))
    .then((data) => data)
    .catch((error) => error)
  return result.data || result.error
}

export const createDriver = (header) => async (driver) => {
  const uri = EPOD_API_URI || 'http://localhost:4000/graphql'

  const link = new HttpLink({ uri })

  const mutateDriver = gql`
    mutation a($driver: DriverInput) {
      createDriver(driver: $driver) {
        id
        name
        plateNumber
        porter
      }
    }
  `

  const operation = {
    query: mutateDriver,
    variables: { driver: driver },
    context: {
      headers: {
        //Den auth
        Authorization: header,
        //Mark auth
        //Authorization: "Basic bWFyazoxMjM=",
      },
    },
  }

  const result: any = await makePromise(execute(link, operation))
    .then((data) => data)
    .catch((error) => error)
  return result.data || result.error
}

export const createCustomer = (header) => async (customer) => {
  const uri = EPOD_API_URI || 'http://localhost:4000/graphql'

  const link = new HttpLink({ uri })

  const mutateCustomer = gql`
    mutation a($customer: CustomerInput) {
      createCustomer(customer: $customer) {
        name
        address{
         building_name
         street
         city
         state
         zip_code
         fullAddress
        }
      }
    }
  `

  const operation = {
    query: mutateCustomer,
    variables: { customer: customer },
    context: {
      headers: {
        //Den auth
        Authorization: header,
        //Mark auth
        //Authorization: "Basic bWFyazoxMjM=",
      },
    },
  }

  const result: any = await makePromise(execute(link, operation))
    .then((data) => data)
    .catch((error) => error)
  return result.data || result.error
}

