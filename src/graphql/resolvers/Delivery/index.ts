const deliveryResolvers = {
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