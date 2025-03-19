import { chatApi } from '@/api'
import { logger, NotificationService } from '@/services'
import { Chat, NewChatDto } from '@/types/chat'

const service = 'chatController.'

export async function createChat(data: NewChatDto): Promise<void> {
  const context = service + createChat.name

  logger.debug(context, 'start')
  await chatApi.createChat(data)
  NotificationService.notify('Чат успешно создан', 'success')
  logger.debug(context, 'successful')
}

export async function getChats(): Promise<Chat[]> {
  const context = service + getChats.name

  logger.debug(context, 'start')
  const chats = await chatApi.getChats()
  logger.debug(context, 'successful')

  return chats
}
