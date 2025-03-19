import { chatApi } from '@/api'
import { logger, NotificationService } from '@/services'
import { NewChatDto } from '@/types/chat'

const service = 'chatController.'

export async function createChat(data: NewChatDto): Promise<void> {
  const context = service + createChat.name

  logger.debug(context, 'start')
  await chatApi.createChat(data)
  NotificationService.notify('Чат успешно создан', 'success')
  logger.debug(context, 'successful')
}
