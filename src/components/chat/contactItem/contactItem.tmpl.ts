import Handlebars from 'handlebars'

import defaultAvatar from '@/assets/avatar.png'
import { ContactItem, MessageType } from '@/pages/chat/types'
import styles from './contactItem.module.scss'

Handlebars.registerHelper('isOutgoingMessage', function (value) {
  return value === MessageType.Outgoing
})

export type ContactItemProps = { contact: ContactItem }

export const ContactListItem = `
  <li id={{contact.id}} class=${styles.contactItem}>
    <button id="contact-{{contact.id}}" >
      <img src=${defaultAvatar} class=${styles.avatar} alt="avatar">

      <div class=${styles.info}>
        <div class=${styles.row}>
          <span class=${styles.name}>{{contact.name}}</span>
          <span class=${styles.date}>{{contact.lastMessage.date}}</span>
        </div>

        <div class=${styles.row}>
          <p 
          class="${styles.lastMessage}
          {{#if (isOutgoingMessage contact.lastMessage.type)}}
            ${styles.outgoing}
          {{/if}}">{{contact.lastMessage.text}}</p>

          {{#if contact.newMessageCount}}
            <div class=${styles.newMessageCount}>{{contact.newMessageCount}}</div>
          {{/if}}
        </div>
      </div>  
    </button>      
  </li> 
`
