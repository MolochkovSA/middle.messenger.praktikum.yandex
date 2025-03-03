import styles from './navbar.module.scss'

export const navbarTemplate = `
  <nav class=${styles.navbar}>
    <div class=${styles.topbar}>
      {{{ ProfileLink }}}

      <div class=${styles.searchInput}>
        {{{ SearchInput }}}  
        <span></span> 
      </div>
    </div>

    <ul>
      {{#each ContactList as |contact|}}
        <li>{{{ contact }}}<li/>
      {{else}}
        <p class=${styles.empty}>No contacts</p>
      {{/each}}
    </ul>
  </nav>
`
