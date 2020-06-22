import { gql } from 'apollo-server'

const deliverytypeDefs = gql`
  type Delivery {
    id: ID!
    scheduledDate: String
    scheduledTime: String
    unSynced: Boolean
    delvStatus: String
    shipmentNumber: String
    trucker: String
    receivedBy: String
  }
  type DeliveryItem {
    id: ID!
    itemNumber: String!
    material: String!
    pricePerUnit: Float!
    uom: String
    qty: Float
    deliveryDateAndTime: String
    deliveryId: String!
    status: String
    materialnumber: String

  }

  type Mutation {
    createDelivery(delivery: DeliveryInput): Delivery
  }

  input DeliveryInput {
    items: [DeliveryItemInput!]!
    customer: ID!
    driver: ID!
    scheduledDate: String
    scheduledTime: String
    trucker: String
    shipmentNumber: String
  }
  
  input DeliveryItemInput {
    itemNumber: String!
    material: String!
    pricePerUnit: Float!
    uom: String
    qty: Float
    deliveryDateAndTime: String
    deliveryId: String
    materialnumber: String
  }

`

export default deliverytypeDefs
