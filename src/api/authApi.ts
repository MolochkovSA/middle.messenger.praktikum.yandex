import { User } from '@/types'
import { BaseApi } from './baseApi'
import { isObject, isUser } from '@/utils'
import { APIError } from '@/errors'
import { logger } from '@/services'

type SignUpRequestDto = Omit<User, 'id' | 'avatar' | 'display_name'> & { password: string }
type SignUpResponseDto = Pick<User, 'id'>

type SignInRequestDto = { login: string; password: string }

class AuthApi extends BaseApi {
  private _context = AuthApi.name + '.'
  constructor() {
    super({ apiPath: '/auth' })
  }

  async signUp(data: SignUpRequestDto): Promise<SignUpResponseDto> {
    const context = this._context + this.signUp.name

    logger.debug(context, 'start')
    const { response } = await this.http.post('/signup', { data })

    if (isObject(response) && 'id' in response && typeof response.id === 'number') {
      logger.debug(context, 'successful')
      return { id: response.id }
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the user id')
  }

  async signIn(data: SignInRequestDto): Promise<void> {
    const context = this._context + this.signIn.name

    logger.debug(context, 'start')
    await this.http.post('/signin', { data })
    logger.debug(context, 'successful')
  }

  async me(): Promise<User> {
    const context = this._context + this.me.name

    logger.debug(context, 'start')
    const { response } = await this.http.get('/user')

    if (isUser(response)) {
      logger.debug(context, 'successful')
      return response
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the user object')
  }

  async logout(): Promise<void> {
    const context = this._context + this.logout.name

    logger.debug(context, 'start')
    await this.http.post('/logout')
    logger.debug(context, 'successful')
  }
}

export const authApi = new AuthApi()
