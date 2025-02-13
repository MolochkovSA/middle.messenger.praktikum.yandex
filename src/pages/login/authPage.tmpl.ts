import Handlebars from 'handlebars'

import { AuthInputProps } from '../../components/auth/authInput'

import styles from './authPage.module.scss'

type AuthPageProps = {
  title: string
  fields: AuthInputProps[]
  button: {
    id: string
    text: string
  }
  link: {
    id: string
    text: string
  }
}

const authPage = `
  <main class=${styles.authPage}>  
    <div class=${styles.authLayout}>
      <h2 class=${styles.title}>
        {{title}}
      </h2>

      <form class=${styles.form}>
        {{#each fields }}
          {{> AuthInput id=id type=type name=name errorMessage=errorMessage value=value}}
        {{/each}}
      </form>

      {{#> Button id=button.id type="submit" className="${styles.button}"}}
        {{button.text}}
      {{/ Button}}

      {{> Link id=link.id path="#" text=link.text className="${styles.link}"}}
    </div>
  </main>
  `

export const AuthPage = Handlebars.compile<AuthPageProps>(authPage)
