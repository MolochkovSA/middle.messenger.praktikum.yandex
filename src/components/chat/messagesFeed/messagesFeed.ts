import { MessageItem } from '@/components'
import { Block } from '@/core'
import { connect } from '@/store/connect'
import { Message } from '@/types/message'
import { UserId } from '@/types/user'
import { ChatId } from '@/types/chat'
import { chatController, messageController } from '@/controllers'
import { NotificationService } from '@/services'
import { getAnotherDate } from '@/utils'

import styles from './messagesFeed.module.scss'

type MessagesFeedProps = {
  messages: Message[]
  userId?: UserId
  chatId?: ChatId
}

type MessagesFeedChildren = {
  Messages: MessageItem[]
}

export class MessagesFeed extends Block<MessagesFeedProps, {}, MessagesFeedChildren> {
  constructor({ messages, userId, chatId }: MessagesFeedProps = { messages: [] }) {
    super({
      props: { messages, userId, chatId },
      children: {
        Messages: [],
      },
    })
  }

  componentDidUpdate(): void {
    const { userId, chatId } = this.getProps()

    if (!chatId) throw new Error('Chat id not found')
    if (!userId) throw new Error('User id not found')

    chatController
      .getChatToken(chatId)
      .then((token) => {
        return messageController.connect({ userId, chatId, token })
      })
      .then(() => {
        return messageController.loadOldMessages()
      })
      .catch((error) => {
        NotificationService.notify((error as Error).message, 'error')
      })
  }

  render(): string {
    const { messages, userId } = this.getProps()

    this.setChildren({
      Messages: messages.map(({ time: rowTime, content, user_id, is_read }, i) => {
        const time = new Date(rowTime).toLocaleTimeString('ru-Ru', { hour: '2-digit', minute: '2-digit' })
        const isMyMessage = user_id === userId
        const date = getAnotherDate(rowTime, messages[i + 1]?.time)

        return new MessageItem({
          time,
          content,
          isMyMessage,
          is_read,
          date,
        })
      }),
    })

    return `
      <ul class=${styles.messages}>
        {{#each Messages as |message|}}
          {{{ message }}}
        {{/each}}
      </ul>
    `
  }
}

export const MessagesFeedWithState = connect<MessagesFeedProps, {}, MessagesFeedChildren>((state) => ({
  messages: state.message.messages,
  userId: state.user.user?.id,
  chatId: state.chat.activeChatId,
}))(MessagesFeed)
