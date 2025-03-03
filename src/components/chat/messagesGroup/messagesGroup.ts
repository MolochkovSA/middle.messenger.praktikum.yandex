import { Block } from '@/core'
import { Message } from '@/pages/chat/types'

import { MessageItem } from '../message/message'

import styles from './messagesGroup.module.scss'

type MessagesGroupProps = {
  date: string
  messages: Message[]
}

type MessagesGroupChildren = {
  Messages: MessageItem[]
}

export class MessagesGroup extends Block<MessagesGroupProps, {}, MessagesGroupChildren> {
  constructor({ date, messages }: MessagesGroupProps) {
    super({
      props: { date, messages },
      children: {
        Messages: messages.map((message) => new MessageItem({ ...message })),
      },
    })
  }

  render(): string {
    return `
      <article class=${styles.messagesSection}>
          <h3 class=${styles.date}>{{date}}</h3>
          
          {{#each Messages as |message|}}
              {{{ message }}}
          {{/each}}   
      </article>
    `
  }
}
