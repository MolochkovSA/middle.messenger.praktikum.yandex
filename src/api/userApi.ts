import { logger } from '@/services'
import { BaseApi } from './baseApi'
import { ResetPasswordDto, User, UserUpdateDTO } from '@/types/user'
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

    const { response } = await this.http.put('/profile', { data })

    if (isUser(response)) {
      logger.debug(context, 'successful')
      return response
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the user object')
  }

  async changeAvatar(data: FormData): Promise<User> {
    const context = this._context + this.changeAvatar.name

    logger.debug(context, 'start')
    const { response } = await this.http.put('/profile/avatar', { data })

    if (isUser(response)) {
      logger.debug(context, 'successful')
      return response
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the user object')
  }

  async resetPassword(data: ResetPasswordDto): Promise<void> {
    const context = this._context + this.resetPassword.name

    logger.debug(context, 'start')
    await this.http.put('/password', { data })
    logger.debug(context, 'successful')
  }

  async searchUsersByLogin(login: string): Promise<User[]> {
    const context = this._context + this.searchUsersByLogin.name

    logger.debug(context, 'start')
    const { response } = await this.http.post('/search', { data: { login } })

    if (Array.isArray(response) && response.every(isUser)) {
      logger.debug(context, 'successful')
      return response
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the users array')
  }
}

export const userApi = new UserApi()
