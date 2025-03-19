import { Block } from '@/core'
import { ChatListItem } from '@/components'
import { MappedChatItem } from '@/pages/chat/types'
import { ChatId } from '@/types/chat'

import styles from './chatList.module.scss'

type ChatListProps = {
  chats: MappedChatItem[]
  setActiveChatId: (id: ChatId) => void
}

type ChatListChildren = {
  ChatList: ChatListItem[]
}

export class ChatList extends Block<ChatListProps, {}, ChatListChildren> {
  constructor({ chats, setActiveChatId }: ChatListProps) {
    super({
      props: {
        chats,
        setActiveChatId,
      },
      children: {
        ChatList: [],
      },
    })
  }

  render(): string {
    const { chats, setActiveChatId } = this.getProps()

    this.setChildren({
      ChatList: chats.map(
        (chat) =>
          new ChatListItem({
            chat,
            onClick: (id: ChatId) => setActiveChatId(id),
          })
      ),
    })

    return `
      <ul>
        {{#each ChatList as |contact|}}
          {{{ contact }}}
        {{else}}
          <p class=${styles.empty}>No contacts</p>
        {{/each}}
      </ul>
    `
  }
}
