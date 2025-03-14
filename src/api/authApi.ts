import { APIError } from '@/errors'
import { BaseApi } from './baseApi'

class AuthApi extends BaseApi {
  constructor() {
    super({ apiPath: '/auth' })
  }

  async signIn(data: { login: string; password: string }): Promise<void | APIError> {
    try {
      await this.http.post('/signin', { data })
    } catch (error) {
      if (APIError.isAPIError(error)) {
        return error
      }
      console.log(error)
    }
  }
}

export const authApi = new AuthApi()
