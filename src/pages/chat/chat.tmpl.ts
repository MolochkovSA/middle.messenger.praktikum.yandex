import styles from './chat.module.scss'

export const chatPageTemplate = `
  <main class=${styles.chatPage}>
    {{{ Navbar }}}

    <div class=${styles.content}>
      {{#if selectedContact}}
        {{{ ContactChat }}}
      {{else}}
        <h2 class=${styles.emptyChat}>Выберите чат чтобы отправить сообщение</h2>
      {{/if}}
    </div>
  </main>
  `
