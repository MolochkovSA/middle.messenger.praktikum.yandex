import { Block } from '@/core'
import { ChatMenuButton, ChatViewBottomBar, MessagesFeed, MessagesFeedWithState } from '@/components'
import { Chat } from '@/types/chat'
import { chatController } from '@/controllers'

import styles from './chatView.module.scss'

export type ChatViewProps = {
  chat?: Chat
}

type ChatViewChildren = {
  ChatMenuButton: ChatMenuButton
  MessagesFeed: MessagesFeed
  ChatViewBottomBar: ChatViewBottomBar
}

export class ChatView extends Block<ChatViewProps, {}, ChatViewChildren> {
  constructor({ chat }: ChatViewProps = {}) {
    super({
      props: {
        chat,
      },
      children: {
        ChatMenuButton: new ChatMenuButton(),
        MessagesFeed: new MessagesFeedWithState(),
        ChatViewBottomBar: new ChatViewBottomBar(),
      },
    })
  }

  componentDidUpdate(): void {
    const chatId = this.getProps().chat?.id

    if (chatId) {
      chatController.getChatUsers(chatId)
    }
  }

  render(): string {
    return `
      <div class="${styles.chatView}">
        {{#if chat}}
          <header class="${styles.header}">
            <img src="{{chat.avatar}}" class="${styles.avatar}" alt="avatar">
            <h2>{{chat.title}}</h2>      
            {{{ ChatMenuButton }}}
          </header>
          
          {{{ MessagesFeed }}}           
          {{{ ChatViewBottomBar }}}
        {{else}}
          <h2 class="${styles.emptyChat}">Выберите чат чтобы отправить сообщение</h2>
        {{/if}}
      </div>
    `
  }
}
