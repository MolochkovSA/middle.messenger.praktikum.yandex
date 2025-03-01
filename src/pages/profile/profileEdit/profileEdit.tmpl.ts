import styles from './profileEdit.module.scss'

export const profileEditPageTemplate = `
  {{#> ProfileLayout}}
    <form class=${styles.form}>
      {{{ EmailInput }}}

      {{{ LoginInput }}}

      {{{ FirstNameInput }}}

      {{{ SecondNameInput }}}

      {{{ DisplayNameInput }}}

      {{{ PhoneInput }}}

      {{{ SubmitButton }}} 
    </form>   
  {{/ ProfileLayout}}
`
