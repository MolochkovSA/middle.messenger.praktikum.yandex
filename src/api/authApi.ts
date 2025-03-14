import { BaseApi } from './baseApi'

export class AuthApi extends BaseApi {
  constructor() {
    super({ url: '/auth' })
  }

  async signIn(data: SignInRequest): Promise<void> {
    const response = await this.fetch.post('/signin', { data })
  }
}

type SignInRequest = {
  login: string
  password: string
}
