import { Block } from '@/core'
import { AddChatUserButton, Button, ChatMenuUserItem } from '@/components'
import circlePlusIcon from '@/assets/circlePlus.svg'

import styles from './chatMenu.module.scss'
import { ChatId, ChatUser } from '@/types/chat'
import { connect } from '@/store/connect'
import { chatController } from '@/controllers'

type ChatMenuProps = {
  chatId?: ChatId
  chatUsers: ChatUser[]
  onClose: (e: Event) => void
}

type ChatMenuEvents = {
  click: (e: Event) => void
}

type ChatMenuChildren = {
  AddUserButton: AddChatUserButton
  ChatUsers: ChatMenuUserItem[]
  RemoveChatButton: Button
}

export class ChatMenu extends Block<ChatMenuProps, ChatMenuEvents, ChatMenuChildren> {
  constructor({ chatUsers, onClose }: ChatMenuProps) {
    super({
      props: {
        chatUsers,
        onClose,
      },
      events: {
        click: (e) => {
          e.stopPropagation()
          if (e.target !== e.currentTarget) return
          this.getProps().onClose(e)
        },
      },
      children: {
        AddUserButton: new AddChatUserButton({
          onClose: (e) => {
            this.getProps().onClose(e)
          },
        }),
        ChatUsers: [],
        RemoveChatButton: new Button({
          label: removeUserButtonLabel,
          className: styles.chatMenuBtn,
          click: (e) => {
            chatController.removeChat(this.getProps().chatId!)
            this.getProps().onClose(e)
          },
        }),
      },
    })
  }

  render(): string {
    const { chatUsers, chatId, onClose } = this.getProps()

    this.setChildren({ ChatUsers: chatUsers.map((user) => new ChatMenuUserItem({ chatId: chatId!, user, onClose })) })

    return `
      <div class="${styles.overlay}">
        <div class="${styles.chatMenu}">
          {{{ AddUserButton }}}

          <ul>
            {{#each ChatUsers as |user|}}
              {{{ user }}}
            {{/each}}           
          </ul>

          {{{ RemoveChatButton }}}
        </div>
      </div>
    `
  }
}

const removeUserButtonLabel = `
    <img src=${circlePlusIcon} class=${styles.removeChatIcon} alt="removeChatIcon">
    <p>Удалить чат</p>    
  `

export const ChatMenuWithState = connect<ChatMenuProps, ChatMenuEvents, ChatMenuChildren>((state) => ({
  chatUsers: state.chat.chatUsers,
  chatId: state.chat.activeChatId,
}))(ChatMenu)
