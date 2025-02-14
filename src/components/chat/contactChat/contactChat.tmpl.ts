import defaultAvatar from '@/assets/avatar.png'
import paperclip from '@/assets/paperclip.svg'
import arrowBtn from '@/assets/arrowBtn.svg'
import circlePlusIcon from '@/assets/circlePlus.svg'

import styles from './contactChat.module.scss'

import { Contact } from '@/pages/chat/types'

export type ContactChatProps = {
  contact: Contact
  isChatMenuOpen?: boolean
}

export const ContactChat = `
  <div class=${styles.chat}>
    <header class=${styles.header}>
      <img src=${defaultAvatar} class=${styles.avatar} alt="avatar">

      <h2>{{contact.name}}</h2>
      
      {{#> Button id="openChatMenuBtn" className="${styles.openChatMenuBtn}"}}
        <div></div> 
      {{/ Button}}

      <div 
      class="${styles.chatMenu}
            {{#if isChatMenuOpen}}
              ${styles.open}
            {{/if}}">
        {{#> Button id="addUserBtn" className="${styles.chatMenuBtn}"}}
          <img src=${circlePlusIcon} alt="circlePlusIcon">
          <p>Добавить пользователя</p> 
        {{/ Button}}

        {{#> Button id="removeUserBtn" className="${styles.chatMenuBtn}"}}
          <img src=${circlePlusIcon} class=${styles.removeUserIcon} alt="circlePlusIcon">
          <p>Удалить пользователя</p> 
        {{/ Button}}
      </div>
    </header>

    <main class=${styles.messages}>
      {{#each contact.messagesGroup}}
        {{> MessagesGroup id=@index date=this.date messages=this.messages}}
      {{/each}}
    </main>

    <footer class=${styles.footer}>
      {{#> Button id="addAttachmentBtn" className="${styles.button}"}}
        <img src=${paperclip} class=${styles.icon} alt="paperclip">
      {{/ Button}}

      {{> Input id=id type="text" name="message" placeholder="Сообщение" className="${styles.input}" value=value}}

      {{#> Button id="sendMessageBtn" className="${styles.button}"}}
        <img src=${arrowBtn} class=${styles.icon} alt="arrowBtn">
      {{/ Button}}
    </footer>
  </div>
`
