import { User } from '@/types'
import { BaseApi } from './baseApi'
import { isObject, isUser } from '@/utils'
import { APIError } from '@/errors'

type SignupRequestDto = Omit<User, 'id' | 'avatar' | 'display_name'> & { password: string }
type SignupResponseDto = Pick<User, 'id'>

type SigninRequestDto = { login: string; password: string }

class AuthApi extends BaseApi {
  constructor() {
    super({ apiPath: '/auth' })
  }

  async signUp(data: SignupRequestDto): Promise<SignupResponseDto> {
    const { response } = await this.http.post('/signup', { data })

    if (isObject(response) && 'id' in response && typeof response.id === 'number') {
      return { id: response.id }
    }

    throw new APIError('Response data does not satisfy the user id')
  }

  async signIn(data: SigninRequestDto): Promise<void> {
    await this.http.post('/signin', { data })
  }

  async me(): Promise<User> {
    const { response } = await this.http.get('/user')

    if (isUser(response)) return response

    throw new APIError('Response data does not satisfy the user object')
  }

  async logout(): Promise<void> {
    await this.http.post('/logout')
  }
}

export const authApi = new AuthApi()
