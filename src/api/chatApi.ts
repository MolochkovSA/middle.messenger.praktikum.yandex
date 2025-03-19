import { BaseApi } from './baseApi'
import { isObject } from '@/utils'
import { APIError } from '@/models'
import { logger } from '@/services'
import { Chat, NewChatDto } from '@/types/chat'

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
    return (await this.http.get('')).response
  }
}

export const chatApi = new ChatApi()
