import { BASE_HTTP_URL } from '@/config/constants'
import { HTTPTransport } from '@/core'

export abstract class BaseApi {
  protected http: HTTPTransport

  constructor({ apiPath }: { apiPath: string }) {
    this.http = new HTTPTransport({ baseUrl: BASE_HTTP_URL + apiPath })
  }
}
