import { Block } from '@/core'
import { ChatId, ChatUser } from '@/types/chat'
import circlePlusIcon from '@/assets/circlePlus.svg'

import styles from './chatMenuUserItem.module.scss'
import { chatController } from '@/controllers'

type ChatMenuUserItemProps = {
  chatId: ChatId
  user: ChatUser
  onClose: (e: Event) => void
}

type ChatMenuUserItemEvents = {
  click: (e: Event) => void
}

export class ChatMenuUserItem extends Block<ChatMenuUserItemProps, ChatMenuUserItemEvents> {
  constructor({ chatId, user, onClose }: ChatMenuUserItemProps) {
    super({
      props: {
        chatId,
        user,
        onClose,
      },
      events: {
        click: (e) => {
          chatController.removeUsersFromChat({ chatId, users: [user.id] })
          this.getProps().onClose(e)
        },
      },
    })
  }

  render(): string {
    return `
        <li class=${styles.userItem}>
          <img src=${circlePlusIcon} class=${styles.removeUserIcon} alt="removeUserIcon">
          <p>{{user.display_name}} </p>
          <img src="{{user.avatar}}" class=${styles.avatar} alt="avatar">
        </li>
    `
  }
}
