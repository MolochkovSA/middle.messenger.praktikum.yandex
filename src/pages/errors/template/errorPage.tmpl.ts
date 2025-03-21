import styles from './errorPage.module.scss'

export const errorPageTemplate = `
<main class="${styles.errorPage}">
  <div class="${styles.container}">
    <h1 class="${styles.code}">{{code}}</h1>

    <p class="${styles.description}">{{description}}</p>
    
    {{{ BackLink }}}
  </div>
</main>
`
