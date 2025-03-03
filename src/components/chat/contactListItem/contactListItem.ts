import { Block } from '@/core'
import { ContactItem } from '@/pages/chat'
import defaultAvatar from '@/assets/avatar.png'
import { MessageType } from '@/pages/chat/types'

import styles from './contactListItem.module.scss'

export type ContactListItemProps = { contact: ContactItem; isActive: boolean }

type ContactListItemEvents = {
  click: (e: Event) => void
}

export class ContactListItem extends Block<ContactListItemProps, ContactListItemEvents> {
  constructor({ contact, isActive, click }: ContactListItemProps & { click: (id: string) => void }) {
    super({
      props: { contact, isActive },
      events: {
        click: () => click(contact.id),
      },
    })
  }

  render(): string {
    const isOutgoingMessage = this.getProps().contact.lastMessage.type === MessageType.Outgoing

    return `
      <button class="${styles.contactItem} {{#if isActive}}${styles.active}{{/if}}">
        <div class=${styles.container}>
          <img 
            src="{{#if contact.avatar}} {{contact.avatar}} {{else}} ${defaultAvatar} {{/if}}" 
            class=${styles.avatar} 
            alt="avatar">

          <div class=${styles.info}>
            <div class=${styles.row}>
              <span class=${styles.name}>{{contact.name}}</span>
              <span class=${styles.date}>{{contact.lastMessage.date}}</span>
            </div>

            <div class=${styles.row}>
              <p class="${styles.lastMessage} ${isOutgoingMessage ? styles.outgoing : ''}">
                {{contact.lastMessage.text}}
              </p>

              {{#if contact.newMessageCount}}
                <div class=${styles.newMessageCount}>{{contact.newMessageCount}}</div>
              {{/if}}
            </div>
          </div>  
        </div>
      </button> 
    `
  }
}
