const driverResolvers = {
  Query: {
    allDrivers: async (parent, args, context, info) => {
      const { fetchDriver, fetchDriverLocation } = context
      const fetchData: any = await fetchDriver()
      let driver: any = fetchData.allDrivers
      const fetchLocation: any = await fetchDriverLocation()
      const driverLocations = fetchLocation.getDriverLocations

      const functionzx = (driverId) => {
        if (driverLocations === null) {
          return undefined
        }

        const filteredLoc = driverLocations.filter(
          (loc) => loc.driverId == driverId,
        )

        return filteredLoc[filteredLoc.length - 1] || {}
      }
      return driver.map((i) => {
        const location = functionzx(i.id)
        return {
          id: i.id,
          name: i.name,
          plateNumber: i.plateNumber,
          porter: i.porter,
          timeStamp: location.timeStamp || '',
          driverId: location.driverId || '',
          latitude: location.latitude || 0,
          longitude: location.longitude || 0,
          mobileTimeStamp: location.mobileTimeStamp || '',
          mobileMocked: location.mobileMocked || false,
          textAddress: location.textAddress || '',
        }
      })
    },

    getDriver: async (parent, { driverId }, context, info) => {
      const { fetchDriver, fetchDriverLocation } = context
      const fetchData: any = await fetchDriver()
      let driver: any = fetchData.allDrivers
      const fetchLocation: any = await fetchDriverLocation()
      const driverLocations = fetchLocation.getDriverLocations

      const filteredDriver = driver.find((driv) => driv.id === driverId)

      if (driverLocations === null) {
        return {
          ...filteredDriver,
          timeStamp: '',
          driverId: '',
          latitude: 0,
          longitude: 0,
          mobileTimeStamp: '',
          mobileMocked: false,
          textAddress: '',
        }
      }

      const filteredLoc = driverLocations.filter(
        (loc) => loc.driverId == driverId,
      )
      let location: any = filteredLoc[filteredLoc.length - 1] || undefined

      return {
        ...filteredDriver,
        timeStamp: location.timeStamp || '',
        driverId: location.driverId || '',
        latitude: location.latitude || 0,
        longitude: location.longitude || 0,
        mobileTimeStamp: location.mobileTimeStamp || '',
        mobileMocked: location.mobileMocked || false,
        textAddress: location.textAddress || '',
      }
    },
  },
  Mutation: {
    createDriver: async (parent, { driver }, context, info) => {
      const { createDriver } = context

      const addNewDriver = await createDriver()
      console.log('addNewDriver', addNewDriver)
      const newDriver = await addNewDriver(driver)
      console.log('newDriver', newDriver)
      return await newDriver.createDriver
    },
  },
}

export default driverResolvers
