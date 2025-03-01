import styles from './profilePassword.module.scss'

export const profilePasswordPageTemplate = `
  {{#> ProfileLayout}}
    <form class=${styles.form}>
      {{{ OldPasswordInput }}}

      {{{ NewPasswordInput }}}

      {{{ NewPasswordRepeatInput }}}

      {{{ SubmitButton }}} 
    </form>   
  {{/ ProfileLayout}}
`
