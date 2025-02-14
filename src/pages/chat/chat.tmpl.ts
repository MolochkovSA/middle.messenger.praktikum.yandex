import rightChevronIcon from '../../../static/chevronRight.svg'

import styles from './chat.module.scss'
import { ContactItem } from './types'

export type ChatProps = {
  searchValue?: string
  contacts: ContactItem[]
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
        {{#each contacts as |contact|}}
          {{> ContactListItem contact=contact}}
        {{else}}
          <p class=${styles.empty}>No contacts</p>
        {{/each}}
      </ul>
    </nav>


  </main>
  `

// <div class=${styles.content}>
// {{> ContactChat}}
// </div>
