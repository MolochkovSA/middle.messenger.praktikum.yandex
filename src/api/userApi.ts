import { logger } from '@/services'
import { BaseApi } from './baseApi'

class UserApi extends BaseApi {
  private _context = UserApi.name + '.'

  constructor() {
    super({ apiPath: '/user' })
  }

  async getUser(): Promise<void> {
    const context = this._context + this.getUser.name

    logger.debug(context, 'start')
    await this.http.get('/user')
    logger.debug(context, 'successful')
  }
}

export const userApi = new UserApi()
