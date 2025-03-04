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

  private _createHTTPMethod = (method: Methods): HTTPMethod => {
    return (path, options = {}) => {
      return this._request(path, { ...options, method })
    }
  }

  get = this._createHTTPMethod(Methods.GET)
  post = this._createHTTPMethod(Methods.POST)
  put = this._createHTTPMethod(Methods.PUT)
  delete = this._createHTTPMethod(Methods.DELETE)

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
    const encodedKey = encodeURIComponent(key)

    acc += acc.length ? '&' : '?'

    if (value instanceof Number || value instanceof String) {
      return acc + `${encodedKey}=${encodeURIComponent(value.toString())}`
    }

    if (Array.isArray(value) && value.every((item) => typeof item === 'string' || typeof item === 'number')) {
      return acc + `${encodedKey}=${value.map((item) => encodeURIComponent(item.toString())).join(',')}`
    }

    return acc
  }, '')
}
