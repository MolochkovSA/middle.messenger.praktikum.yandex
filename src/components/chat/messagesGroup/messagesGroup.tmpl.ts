import { Message } from '@/pages/chat/types'

import styles from './messagesGroup.module.scss'

export type MessagesGroupProps = {
  id: number
  date: string
  messages: Message[]
}

export const MessagesGroup = `
    <section id="messages-group-{{id}}" class=${styles.messagesSection}>
      <h3 class=${styles.date}>{{date}}</h3>
      
      {{#each messages}}
        {{> Message id=@index message=this}}
      {{/each}}

    </section>
`
