import styles from './errorPage.module.scss'

export type ErrorPageProps = {
  code: number
  description: string
}

export const errorPage = `
<main class=${styles.errorPage}>
  <div class=${styles.container}>
    <h1 class=${styles.code}>{{code}}</h1>

    <p class=${styles.description}>{{description}}</p>
    
    {{#> Link className="${styles.link}" data-page="/chat"}}
      Назад к чатам
    {{/ Link}}
  </div>
</main>
`
