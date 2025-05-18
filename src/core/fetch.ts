export enum REQUEST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type TRequestOptions = {
  method?: REQUEST_METHODS
  headers?: Record<string, string>
  data?: Record<string, unknown>
  timeout?: number
}

type HTTPMethod = <R = unknown>(
  url: string,
  options?: TRequestOptions,
) => Promise<R>

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: TRequestOptions['data']) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  return Object.keys(data)
    .reduce((res, key) => res + `${key}=${data[key]}` + '&', '?')
    .slice(0, -1)
}

export class HTTPTransport {
  get: HTTPMethod = (url: string, options: TRequestOptions = {}) => {
    const params = options.data ? queryStringify(options.data) : ''
    return this.request(url + params, {
      ...options,
      method: REQUEST_METHODS.GET,
    })
  }

  post: HTTPMethod = (url: string, options: TRequestOptions = {}) => {
    return this.request(url, { ...options, method: REQUEST_METHODS.POST })
  }

  put: HTTPMethod = (url: string, options: TRequestOptions = {}) => {
    return this.request(url, { ...options, method: REQUEST_METHODS.PUT })
  }

  delete: HTTPMethod = (url: string, options: TRequestOptions = {}) => {
    return this.request(url, { ...options, method: REQUEST_METHODS.DELETE })
  }

  request<R = XMLHttpRequest>(
    url: string,
    options: TRequestOptions = { method: REQUEST_METHODS.GET },
  ): Promise<R> {
    const { method, data, headers = {} } = options
    const timeout = options?.timeout ?? 5000

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method')
        return
      }

      const isGet = method === REQUEST_METHODS.GET

      const xhr = new XMLHttpRequest()

      xhr.open(method, url)

      Object.entries(headers).forEach(([key, value]) =>
        xhr.setRequestHeader(key, value),
      )

      xhr.timeout = timeout

      xhr.onload = () => resolve(xhr as R)
      xhr.onabort = () => reject
      xhr.onerror = () => reject
      xhr.ontimeout = () => reject

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}

// function fetchWithRetry(url, options = {}) {
//   const retries = options?.retries ?? 1
//
//   const onError = (err) => {
//     if (!retries--)
//       throw err
//
//     return fetchWithRetry(url, { ...options, retries })
//   }
//
//   return fetch(url, options).catch(onError)
// }
