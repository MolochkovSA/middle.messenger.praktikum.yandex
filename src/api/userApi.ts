import { BaseApi } from './baseApi'

class UserApi extends BaseApi {
  constructor() {
    super({ apiPath: '/user' })
  }

  async getUser(): Promise<void> {
    await this.http.get('/user')
  }
}

export const userApi = new UserApi()
