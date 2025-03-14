import { Fetch } from '@/services'

export class BaseApi {
  protected baseUrl: string
  protected fetch: Fetch

  constructor({ url }: { url: string }) {
    this.baseUrl = 'https://ya-praktikum.tech/api/v2' + url
    this.fetch = new Fetch({ baseUrl: this.baseUrl })
  }

  create() {
    throw new Error('Not implemented')
  }

  request() {
    throw new Error('Not implemented')
  }

  update() {
    throw new Error('Not implemented')
  }

  delete() {
    throw new Error('Not implemented')
  }
}
