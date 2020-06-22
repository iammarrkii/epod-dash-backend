import moment from 'moment'

const injectMiddleware = (fn, injectorFn) => {
  return injectorFn(fn)
}

const injectMiddlewareAsync = (
  fn,
  injectorFn: () => Promise<any>,
): ((...args: any[]) => Promise<any>) => {
  return (...args) =>
    new Promise((resolve, reject) => {
      injectorFn()
        .then((d) => resolve(fn(...args)))
        .catch((e) => reject(e))
    })
}

const injectMiddlewareAsyncWithUser = (
  fn,
  injectorFn: () => Promise<any>,
): ((...args: any[]) => Promise<any>) => {
  return (...args) =>
    new Promise((resolve, reject) => {
      injectorFn()
        .then((d) => {
          console.log('function name', fn.name)
          resolve({
            user: d,
            fn: fn(...args),
          })
        })
        .catch((e) => reject(e))
    })
}

const MobiletimeStampTimeAndDate: any = (mobileTimeStamp) => {
  if (mobileTimeStamp === undefined) {
    return ''
  }
  const timeStamp = moment(parseInt(mobileTimeStamp)).format('LLLL')

  return timeStamp
}

export {
  injectMiddleware,
  injectMiddlewareAsync,
  injectMiddlewareAsyncWithUser,
  MobiletimeStampTimeAndDate,
}
