import { APIError } from '@/errors'
import { Indexed } from '@/types'

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestOptions = {
  method: Methods
  headers?: Record<string, string>
  data?: Indexed
  timeout?: number
}

type HTTPMethod = (path: string, options?: Omit<RequestOptions, 'method'>) => Promise<XMLHttpRequest>

export class HTTPTransport {
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

  private _request = (path: string, options: RequestOptions): Promise<XMLHttpRequest> => {
    const { method, data, headers, timeout = 5000 } = options

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

      xhr.withCredentials = true
      xhr.responseType = 'json'
      xhr.timeout = timeout

      xhr.onload = () => {
        const status = xhr.status

        if (status >= 400 && status < 599) {
          reject(xhr.response as APIError)
        } else {
          resolve(xhr)
        }
      }

      const errorHandler = (ev: ProgressEvent<EventTarget>) => reject(new APIError(ev.type))

      xhr.onabort = errorHandler
      xhr.onerror = errorHandler
      xhr.ontimeout = errorHandler

      if (isGet || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    })
  }
}

function queryStringify(data: Indexed): string {
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
