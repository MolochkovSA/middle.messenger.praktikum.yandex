import Handlebars from 'handlebars'

import defaultAvatar from '../../../../../static/avatar.png'
import { Message, MessageType, Contact } from '../../types'

import styles from './contactItem.module.scss'

Handlebars.registerHelper('isOutgoingMessage', function (value) {
  return value === MessageType.Outgoing
})

export type ContactItemProps = Pick<Contact, 'id' | 'name'> &
  Pick<Message, 'date' | 'messageType'> & { massage: Message['text']; newMessageCount?: number }

export const ContactItem = `
  <li>
    <button id="contact-{{id}}" class=${styles.contactItem}>
      <img src=${defaultAvatar} class=${styles.avatar} alt="avatar">

      <div class=${styles.info}>
        <div class=${styles.row}>
          <span class=${styles.name}>{{name}}</span>
          <span class=${styles.date}>{{date}}</span>
        </div>

        <div class=${styles.row}>
          <p 
          class="${styles.lastMessage}
          {{#if (isOutgoingMessage messageType)}}
            ${styles.outgoing}
          {{/if}}">{{message}}</p>
          {{#if newMessageCount}}
            <div class=${styles.newMessagecount}>{{newMessageCount}}</div>
          {{/if}}
        </div>
      </div>  
    </button>      
  </li> 
`
