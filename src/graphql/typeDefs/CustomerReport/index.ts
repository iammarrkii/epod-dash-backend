import { gql } from 'apollo-server'

const customerTypeDef = gql`
  type MaterialDetails {
    id: ID
    itemNumber: String
    material: String
    uom: String
    qty: String
  }

  type Customer {
    id: ID
    customer: String
    shipment: String
    delivery: String
    noVarianceMaterial: [MaterialDetails]
    withVarianceMaterial: [MaterialDetails]
    varianceReport: VarianceReport
    materialReport: MaterialReport
    variance: [Variance]
  }

  type MaterialReport {
    id: ID
    totalReceived: String
    totalVariance: String
  }

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

  type Item {
    id: ID
    itemNumber: String
    material: String
    pricePerUnit: String
    uom: String
    qty: String
    variance: [Variance]
    varianceQty: String
    reasonOfVariance: String
    deliveryDateAndTime: String
  }
  type CustomerList {
    name: String
    address: AddressList
  }

  type AddressList {
    building_name: String
    street: String
    city: String
    state: String
    zip_code: String
    fullAddress: String
  }

  type Variance {
    id: ID
    varianceQty: String
    reasonOfVariance: String
  }

  type Query {
    customerReport(customer: String): Customer
    allCustomerReport(dateFrom: String, dateTo: String): [Customer]
  }
  type Mutation {
    createCustomer(customer: CustomerInput): CustomerList
  }
  
  input CustomerInput {
    name: String!
    address: AddressInput!
  }

  input AddressInput {
    building_name: String
    street: String
    city: String
    state: String
    zip_code: String
    fullAddress: String
  }
`

export default customerTypeDef
