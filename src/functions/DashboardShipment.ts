export const getCompleteShipment = (
  shipmentNumber: String,
  deliveries: any,
) => {
  let pendingCount = 0
  deliveries
    .filter((d) => d.shipmentNumber === shipmentNumber)
    .map((del) => {
      if (del.delvStatus === 'Complete') {
      } else {
        pendingCount = pendingCount + 1
      }
    })

  if (pendingCount > 0) {
    return false
  } else {
    return true
  }
}
