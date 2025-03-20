import { Block } from '@/core'
import { ChatId } from '@/types/chat'
import { MappedChatItem } from '@/pages/chat/types'

import styles from './chatListItem.module.scss'

export type ChatListItemProps = { chat: MappedChatItem }

type ChatListItemEvents = {
  click: (e: Event) => void
}

export class ChatListItem extends Block<ChatListItemProps, ChatListItemEvents> {
  constructor({ chat, onClick }: ChatListItemProps & { onClick: (id: ChatId) => void }) {
    super({
      props: { chat },
      events: {
        click: () => onClick(chat.id),
      },
    })
  }

  render(): string {
    return `
      <li class="${styles.chatItem} {{#if chat.isActive}}${styles.isActive}{{/if}}">
        <div class=${styles.container}>
          <img src="{{chat.avatar}}" class=${styles.avatar} alt="avatar">

          <div class=${styles.info}>
            <div class=${styles.row}>
              <span class=${styles.name}>{{chat.title}}</span>
              <span class=${styles.date}>{{chat.messageDate}}</span>
            </div>

            <div class="${styles.row} ${styles.message}">
              <p class="${styles.lastMessage} {{#if chat.isMyMessage}}${styles.outgoing}{{/if}}">
                {{chat.messageText}}
              </p>

              {{#if chat.unread_count}}
                <div class=${styles.newMessageCount}>{{chat.unread_count}}</div>
              {{/if}}
            </div>
          </div>  
        </div>
      </li> 
    `
  }
}
