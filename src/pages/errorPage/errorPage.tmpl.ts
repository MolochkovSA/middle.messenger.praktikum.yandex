import Handlebars from 'handlebars'

import styles from './errorPage.module.scss'

type ErrorPageProps = {
  code: number
  description: string
}

const errorPage = `
<main class=${styles.errorPage}>
  <div class=${styles.container}>
    <h1 class=${styles.code}>{{code}}</h1>

    <p class=${styles.description}>{{description}}</p>
    
    {{> Link id="errorPageLink" path="#" text="Назад к чатам" className="${styles.link}"}}
  </div>
</main>
`

export const ErrorPage = Handlebars.compile<ErrorPageProps>(errorPage)
