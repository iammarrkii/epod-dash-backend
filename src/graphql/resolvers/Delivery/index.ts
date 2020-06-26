import { filterByDateRange } from '../../../functions/DateFunctions'

const deliveryResolvers = {
  Query: {
    allDeliverys: async (
      parent,
      { dateFrom, dateTo },
      { fetchDelivery },
      info,
    ) => {
      const fetchData: any = await fetchDelivery()
      let deliveries: any = fetchData.allDeliverys

      if (dateFrom || dateTo) {
        deliveries = deliveries.filter((del) => {
          if (filterByDateRange(dateFrom, dateTo, del.scheduledDate)) {
            return del
          }
        })
      }

      return deliveries.map((del) => ({
        customer: del.customer.name,
        driver: del.driver.name,
        file: del.file ? del.file.map((f) => f.path) : null,
        id: del.id,
        items: del.items.map((i) => ({
          id: i.id,
          itemNumber: i.itemNumber,
          material: i.material,
          pricePerUnit: i.pricePerUnit,
          uom: i.uom,
          qty: i.qty,
          variance: i.variance.map((v) => ({
            id: v.id,
            varianceQty: v.varianceQty,
            reasonOfVariance: v.reasonOfVariance,
          })),
          varianceQty: i.varianceQty,
          reasonOfVariance: i.reasonOfVariance,
          deliveryDateAndTime: i.deliveryDateAndTime,
        })),
        deliveryStatus: del.delvStatus,
        scheduledDate: del.scheduledDate,
        scheduledTime: del.scheduledTime,
        shipmentNumber: del.shipmentNumber,
        trucker: del.trucker,
        plateNumber: del.driver.plateNumber,
        helper: del.driver.porter,
        fullAddress: del.customer.address.fullAddress,
      }))
    },
  },
  Mutation: {
    createDelivery: async (parent, { delivery }, context, info) => {
      const { createDelivery } = context
      const addNewDelivery = await createDelivery()
      console.log('addNewDelivery', addNewDelivery)
      const newDelivery = await addNewDelivery(delivery)
      console.log('newDelivery', newDelivery)
      return {
        ...newDelivery.createDelivery,
        driver: newDelivery.createDelivery.driver.name,
        customer: newDelivery.createDelivery.customer.name,
        helper: newDelivery.createDelivery.driver.porter,
        plateNumber: newDelivery.createDelivery.driver.plateNumber,
        fullAddress: newDelivery.createDelivery.customer.address.fullAddress,
      }
    },
  },
}

export default deliveryResolvers
