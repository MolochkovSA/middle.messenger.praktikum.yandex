import rightChevronIcon from '../../../static/chevronRight.svg'

import styles from './chat.module.scss'
import { Contact, ContactItem } from './types'

export type ChatProps = {
  searchValue?: string
  contactsList: ContactItem[]
  selectedContact?: Contact
  isChatMenuOpen?: boolean
}

export const Chat = `
  <main class=${styles.chatPage}>
    <nav class=${styles.navbar}>
      <div class=${styles.topbar}>
        {{#> Link id="profileLink" path="#" className="${styles.link}" data-page="/profile"}}
          <span>Профиль</span> 
          <img src=${rightChevronIcon} alt="chevronRight">
        {{/ Link}}

        {{> SearchInput id="searchInput" value=searchValue}}
      </div>
      
      <ul>
        {{#each contactsList as |contact|}}
          {{> ContactListItem contact=contact}}
        {{else}}
          <p class=${styles.empty}>No contacts</p>
        {{/each}}
      </ul>
    </nav>

    <div class=${styles.content}>
     {{#if selectedContact}}
      {{> ContactChat contact=selectedContact isChatMenuOpen=isChatMenuOpen}}
     {{else}}
      <h2 class=${styles.emptyChat}>Выберите чат чтобы отправить сообщение</h2> 
     {{/if}}
      
    </div>
  </main>
  `
