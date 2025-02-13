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
      <h1 class=${styles.title}>
        {{title}}
      </h1>

      <form class=${styles.form}>
        {{> @partial-block}}
      </form>
  </main>
  `
