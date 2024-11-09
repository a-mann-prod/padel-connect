export const transformParams = (params: { [key: string]: any }) => {
  const transformedParams: { [key: string]: any } = {}

  for (const key in params) {
    if (Array.isArray(params[key])) {
      transformedParams[key] = params[key].join(',')
    } else {
      transformedParams[key] = params[key]
    }
  }

  return transformedParams
}
