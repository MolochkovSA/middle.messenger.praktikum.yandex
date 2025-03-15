import { BaseApi } from './baseApi'

class AuthApi extends BaseApi {
  constructor() {
    super({ apiPath: '/auth' })
  }

  async signIn(data: { login: string; password: string }): Promise<void> {
    await this.http.post('/signin', { data })
  }
}

export const authApi = new AuthApi()
