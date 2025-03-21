import { BaseApi } from './baseApi'
import { isChat, isChatUser, isObject } from '@/utils'
import { APIError } from '@/models'
import { logger } from '@/services'
import { Chat, ChatId, ChatUserDto, NewChatDto } from '@/types/chat'
import { UserId } from '@/types/user'

class ChatApi extends BaseApi {
  private _context = ChatApi.name + '.'
  constructor() {
    super({ apiPath: '/chats' })
  }

  async createChat(data: NewChatDto): Promise<Pick<Chat, 'id'>> {
    const context = this._context + this.createChat.name

    logger.debug(context, 'start')
    const { response } = await this.http.post('', { data })

    if (isObject(response) && 'id' in response && typeof response.id === 'number') {
      logger.debug(context, 'successful')
      return { id: response.id }
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the chat id')
  }

  async getChats(): Promise<Chat[]> {
    const context = this._context + this.getChats.name

    logger.debug(context, 'start')
    const { response } = await this.http.get('')

    if (Array.isArray(response) && response.every(isChat)) {
      logger.debug(context, 'successful')
      return response
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the chats')
  }

  async removeChat(chatId: ChatId): Promise<void> {
    const context = this._context + this.removeChat.name

    logger.debug(context, 'start')
    await this.http.delete(``, { data: { chatId } })
    logger.debug(context, 'successful')
  }

  async addUsersToChat(data: { chatId: ChatId; users: UserId[] }): Promise<void> {
    const context = this._context + this.addUsersToChat.name

    logger.debug(context, 'start')
    await this.http.put('/users', { data })
    logger.debug(context, 'successful')
  }

  async removeUsersFromChat(data: { chatId: ChatId; users: UserId[] }): Promise<void> {
    const context = this._context + this.removeUsersFromChat.name

    logger.debug(context, 'start')
    await this.http.delete('/users', { data })
    logger.debug(context, 'successful')
  }

  async getChatUsers(chatId: ChatId): Promise<ChatUserDto[]> {
    const context = this._context + this.getChatUsers.name

    logger.debug(context, 'start')
    const { response } = await this.http.get(`/${chatId}/users`)

    if (Array.isArray(response) && response.every(isChatUser)) {
      logger.debug(context, 'successful')
      return response
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the users array')
  }

  async getChatToken(chatId: ChatId): Promise<string> {
    const context = this._context + this.getChatToken.name

    logger.debug(context, 'start')
    const { response } = await this.http.post(`/token/${chatId}`)

    if (isObject(response) && typeof response.token === 'string') {
      logger.debug(context, 'successful')
      return response.token
    }

    logger.debug(context, 'failed')
    throw new APIError('Response data does not satisfy the token string')
  }
}

export const chatApi = new ChatApi()
