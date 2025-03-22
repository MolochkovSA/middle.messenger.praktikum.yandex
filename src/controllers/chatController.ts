import { chatApi } from '@/api'
import { APIError } from '@/models'
import { logger, NotificationService } from '@/services'
import { dispatch } from '@/store'
import { chatActions } from '@/store/chat'
import { Chat, ChatId, ChatUser, NewChatDto } from '@/types/chat'
import { UserId } from '@/types/user'
import { getAvatarSrc } from '@/utils'

const service = 'ChatController.'

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

export async function removeChat(chatId: ChatId): Promise<void> {
  const context = service + removeChat.name

  logger.debug(context, 'start')
  dispatch(chatActions.setLoading(true))

  try {
    await chatApi.removeChat(chatId)
    NotificationService.notify('Чат успешно удален', 'success')
    await getChats()
    logger.debug(context, 'successful')
  } catch (error) {
    if (APIError.isAPIError(error)) {
      NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  } finally {
    dispatch(chatActions.setLoading(false))
  }
}

export async function addUsersToChat(data: { chatId: ChatId; users: UserId[] }): Promise<void> {
  const context = service + addUsersToChat.name

  logger.debug(context, 'start')
  dispatch(chatActions.setLoading(true))

  try {
    await chatApi.addUsersToChat(data)
    NotificationService.notify('Пользователь успешно добавлен', 'success')
    await getChatUsers(data.chatId)
    logger.debug(context, 'successful')
  } catch (error) {
    if (APIError.isAPIError(error)) {
      NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  } finally {
    dispatch(chatActions.setLoading(false))
  }
}

export async function removeUsersFromChat(data: { chatId: ChatId; users: UserId[] }): Promise<void> {
  const context = service + removeUsersFromChat.name

  logger.debug(context, 'start')
  dispatch(chatActions.setLoading(true))

  try {
    await chatApi.removeUsersFromChat(data)
    NotificationService.notify('Пользователь успешно удален', 'success')
    await getChatUsers(data.chatId)
    logger.debug(context, 'successful')
  } catch (error) {
    if (APIError.isAPIError(error)) {
      NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  } finally {
    dispatch(chatActions.setLoading(false))
  }
}

export async function getChatUsers(chatId: ChatId): Promise<ChatUser[]> {
  const context = service + getChatUsers.name

  logger.debug(context, 'start')
  dispatch(chatActions.setLoading(true))

  try {
    const chatUsersRow = await chatApi.getChatUsers(chatId)
    const usersWithAvatarSrc: ChatUser[] = chatUsersRow.map<ChatUser>((user) => ({
      ...user,
      avatar: getAvatarSrc(user.avatar),
      display_name: user.display_name || `${user.first_name} ${user.second_name}`,
    }))
    dispatch(chatActions.setChatUsers(usersWithAvatarSrc))
    logger.debug(context, 'successful')
    return usersWithAvatarSrc
  } catch (error) {
    if (APIError.isAPIError(error)) {
      NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
    dispatch(chatActions.clearChatUsers())
    return []
  } finally {
    dispatch(chatActions.setLoading(false))
  }
}

export async function getChatToken(chatId: ChatId): Promise<string> {
  const context = service + getChatToken.name

  logger.debug(context, 'start')
  dispatch(chatActions.setLoading(true))

  try {
    const token = await chatApi.getChatToken(chatId)
    logger.debug(context, 'successful')
    return token
  } catch (error) {
    if (APIError.isAPIError(error)) {
      NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
    return ''
  } finally {
    dispatch(chatActions.setLoading(false))
  }
}
