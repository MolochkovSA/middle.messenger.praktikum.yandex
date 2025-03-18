import { logger } from '@/services'
import { BaseApi } from './baseApi'
import { User, UserUpdateDTO } from '@/types/user'
import { isUser } from '@/utils'
import { APIError } from '@/models'

class UserApi extends BaseApi {
  private _context = UserApi.name + '.'

  constructor() {
    super({ apiPath: '/user' })
  }

  async updatetUser(data: UserUpdateDTO): Promise<User> {
    const context = this._context + this.updatetUser.name

    logger.debug(context, 'start')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const { response } = await this.http.put('/profile', { data })

    if (isUser(response)) {
      logger.debug(context, 'successful')
      return response
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the user object')
  }
}

export const userApi = new UserApi()
