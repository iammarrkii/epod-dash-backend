import { gql } from 'apollo-server'

const drivertypeDefs = gql`
  type Driver {
    id: ID
    name: String
    plateNumber: String
    porter: String
    timeStamp: String
    driverId: String
    latitude: Float
    longitude: Float
    mobileTimeStamp: String
    mobileMocked: Boolean
    textAddress: String
  }
  type DriverLocation {
    id: ID
    timeStamp: String
    driverId: String
    latitude: Float
    longitude: Float
    mobileTimeStamp: String
    mobileMocked: Boolean
    textAddress: String
  }
  type Query {
    allDrivers: [Driver]
    getDriver(driverId: String): Driver
  }

  type Mutation {
    createDriver(driver: DriverInput): Driver
  }

  input DriverInput {
    name: String
    porter: String
    plateNumber: String
  }
`

export default drivertypeDefs
