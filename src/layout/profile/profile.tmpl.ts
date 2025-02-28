import styles from './profile.module.scss'

export const ProfileLayout = `
  <main class=${styles.profileLayout}>
    {{{ BackLink }}}

    <div class=${styles.content}>
      <h1 class=${styles.title}>Profile</h1>

      {{{ AvataButton }}}

      {{> @partial-block}}      
    </div>
  </main>
`
