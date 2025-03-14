import { BASE_URL } from '@/config/constants'
import { HTTPTransport } from '@/core'

export abstract class BaseApi {
  protected baseUrl: string
  protected http: HTTPTransport

  constructor({ apiPath }: { apiPath: string }) {
    this.baseUrl = BASE_URL + apiPath
    this.http = new HTTPTransport({ baseUrl: this.baseUrl })
  }
}
