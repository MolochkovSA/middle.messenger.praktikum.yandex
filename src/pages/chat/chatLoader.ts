import { chatController } from '@/controllers'
import { authGuard } from '@/services'
import { Chat } from '@/types/chat'

export async function chatLoader(): Promise<Chat[]> {
  authGuard()

  return await chatController.getChats()
}
