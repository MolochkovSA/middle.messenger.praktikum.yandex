import styles from './auth.module.scss'

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
