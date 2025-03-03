import defaultAvatar from '@/assets/avatar.png'
import circlePlusIcon from '@/assets/circlePlus.svg'

import styles from './contactChat.module.scss'

export const contactChatTemplate = `
  <div class=${styles.chat}>
    <header class=${styles.header}>
      <img 
        src="{{#if contact.avatar}} {{contact.avatar}} {{else}} ${defaultAvatar} {{/if}}"  
        class=${styles.avatar} 
        alt="avatar">
      <h2>{{contact.name}}</h2>      
      {{{ ChatMenuButton }}}
    </header>

    <main class=${styles.messages}>
      {{#each MessagesGroup as |group|}}
        {{{ group }}}
      {{/each}}
    </main>

    <footer class=${styles.footer}>
      {{{ AddAttachmentButton }}}
      {{{ MessageInput }}}
      {{{ SendMessageButton }}}
    </footer>
  </div>
`
// <main class=${styles.messages}>
// {{#each contact.messagesGroup}}
//   {{> MessagesGroup id=@index date=this.date messages=this.messages}}
// {{/each}}
// </main>

//      <div
// class="${styles.chatMenu}
// {{#if isChatMenuOpen}}
//   ${styles.open}
// {{/if}}">
// {{#> Button id="addUserBtn" className="${styles.chatMenuBtn}"}}
// <img src=${circlePlusIcon} alt="circlePlusIcon">
// <p>Добавить пользователя</p>
// {{/ Button}}

// {{#> Button id="removeUserBtn" className="${styles.chatMenuBtn}"}}
// <img src=${circlePlusIcon} class=${styles.removeUserIcon} alt="circlePlusIcon">
// <p>Удалить пользователя</p>
// {{/ Button}}
// </div>
