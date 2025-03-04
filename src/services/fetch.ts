enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestOptions = {
  headers?: Record<string, string>
  data?: Record<string, unknown>
  timeout?: number
}

type RequestOptionsWithMethod = {
  method: Methods
} & RequestOptions

type HTTPMethod = (path: string, options?: RequestOptions) => Promise<XMLHttpRequest>

export class Fetch {
  private _baseUrl: string

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl
  }

  get: HTTPMethod = (path, options = {}) => {
    return this._request(path, { ...options, method: Methods.GET })
  }

  post: HTTPMethod = (path, options = {}) => {
    return this._request(path, { ...options, method: Methods.POST })
  }

  put: HTTPMethod = (path, options = {}) => {
    return this._request(path, { ...options, method: Methods.PUT })
  }

  delete: HTTPMethod = (path, options = {}) => {
    return this._request(path, { ...options, method: Methods.DELETE })
  }

  private _request = (path: string, options: RequestOptionsWithMethod): Promise<XMLHttpRequest> => {
    const { method = Methods.GET, data, headers, timeout = 5000 } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      const isGet = method === Methods.GET
      const url = this._baseUrl + path

      xhr.open(method, isGet && data ? `${url}${queryStringify(data)}` : url)

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value)
        })
      }

      xhr.responseType = 'json'
      xhr.timeout = timeout

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr)
        } else {
          reject(xhr)
        }
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (!isGet || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}

function queryStringify(data: Record<string, unknown>) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc += acc.length ? '&' : '?'

    if (value instanceof Number || value instanceof String) {
      return acc + `${key}=${value}`
    }

    if (Array.isArray(value) && value.every((item) => typeof item === 'string' || typeof item === 'number')) {
      return acc + `${key}=${value.join(',')}`
    }

    return acc
  }, '')
}
