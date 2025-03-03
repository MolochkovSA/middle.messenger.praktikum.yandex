import defaultAvatar from '@/assets/avatar.png'

import styles from './contactListItem.module.scss'

export const contactListItemTemplate = `
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
    </div>
  </button> 
`
