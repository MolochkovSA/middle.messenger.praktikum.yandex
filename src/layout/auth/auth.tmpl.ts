import styles from './auth.module.scss'

export type AuthLayoutProps = {
  title: string
  buttonId: string
  buttonLabel: string
  linkLabel: string
  linkTo: string
}

export const AuthLayout = `
  <main class=${styles.authLayout}>  
    <div class=${styles.authCard}>
      <h2 class=${styles.title}>
        {{title}}
      </h2>

      <form class=${styles.form}>
        {{> @partial-block}}
      </form>

      {{#> Button id=buttonId type="submit" className="${styles.button}"}}
        {{buttonLabel}}
      {{/ Button}}

      {{#> Link className="${styles.link}" data-page=linkTo}}
        {{linkLabel}}
      {{/ Link}}
    </div>
  </main>
  `
