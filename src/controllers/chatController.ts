import { chatApi } from '@/api'
import { APIError } from '@/models'
import { logger, NotificationService } from '@/services'
import { dispatch } from '@/store'
import { chatActions } from '@/store/chat'
import { Chat, NewChatDto } from '@/types/chat'

const service = 'chatController.'

export async function createChat(data: NewChatDto): Promise<void> {
  const context = service + createChat.name

  logger.debug(context, 'start')
  dispatch(chatActions.setLoading(true))

  try {
    await chatApi.createChat(data)
    NotificationService.notify('Чат успешно создан', 'success')
    await getChats()
    logger.debug(context, 'successful')
  } catch (error) {
    logger.error(context, error)

    throw error
  } finally {
    dispatch(chatActions.setLoading(false))
  }
}

export async function getChats(): Promise<Chat[]> {
  const context = service + getChats.name

  logger.debug(context, 'start')
  dispatch(chatActions.setLoading(true))

  try {
    const chats = await chatApi.getChats()
    dispatch(chatActions.setChats(chats))
    logger.debug(context, 'successful')
    return chats
  } catch (error) {
    if (APIError.isAPIError(error)) {
      NotificationService.notify(error.reason, 'error')
    }

    throw error
  } finally {
    dispatch(chatActions.setLoading(false))
  }
}
