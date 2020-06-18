import { MobiletimeStampTimeAndDate } from '../../../commons/utils'
import moment from 'moment'

const driverLocationResolvers = {
  Query: {
    getDriverLocations: async (parent, { driverId }, context, info) => {
      const { fetchDriver, fetchDriverLocation } = context
      const fetchData: any = await fetchDriver()
      let driver: any = fetchData.allDrivers
      const fetchLocation: any = await fetchDriverLocation()
      const driverLocations = fetchLocation.getDriverLocations

      const mobileTimeStamp = MobiletimeStampTimeAndDate()

      const filteredDriverLocation = driver.find((driv) => driv.id === driverId)
      const filteredLoc = driverLocations.filter(
        (loc) => loc.driverId == driverId,
      )

      let location: any = filteredLoc[filteredLoc.length - 1] || undefined

      return {
        ...filteredDriverLocation,
        timeStamp: location.timeStamp || '',
        driverId: location.driverId || '',
        latitude: location.latitude || 0,
        longitude: location.longitude || 0,
        mobileTimeStamp:
          MobiletimeStampTimeAndDate(location.mobileTimeStamp) || '',
        mobileMocked: location.mobileMocked || false,
        textAddress: location.textAddress || '',
      }
    },
  },
}

export default driverLocationResolvers
