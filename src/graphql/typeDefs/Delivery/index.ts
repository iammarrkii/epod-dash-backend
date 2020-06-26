import { gql } from 'apollo-server'

const deliverytypeDefs = gql`
  type Delivery {
    id: ID
    customer: String
    driver: String
    file: [String]
    items: [Item]
    deliveryStatus: String
    scheduledDate: String
    scheduledTime: String
    shipmentNumber: String
    trucker: String
    plateNumber: String
    helper: String
    fullAddress: String
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

  type Query {
    allDeliverys(dateFrom: String, dateTo: String): [Delivery]
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
