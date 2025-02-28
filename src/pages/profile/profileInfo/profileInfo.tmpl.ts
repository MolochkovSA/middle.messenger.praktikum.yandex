import styles from './profileInfo.module.scss'

export const profileInfoPageTemplate = `
  {{#> ProfileLayout}}
    <h2 class=${styles.title}>{{ title }}</h2>

    <form class=${styles.form}>
      {{{ EmailInput }}}

      {{{ LoginInput }}}

      {{{ FirstNameInput }}}

      {{{ SecondNameInput }}}

      {{{ DisplayNameInput }}}

      {{{ PhoneInput }}}
    </form>

    {{{ ProfileChangeLink }}}

    {{{ PasswordChangeLink }}}

    {{{ LogoutLink }}}
  {{/ ProfileLayout}}
`
