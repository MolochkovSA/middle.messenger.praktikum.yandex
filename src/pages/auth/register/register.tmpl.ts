export const registerPageTemplate = `
  {{#> AuthLayout title="Регистрация"}}
    {{{ EmailInput }}}

    {{{ LoginInput }}}

    {{{ FirstNameInput }}}

    {{{ SecondNameInput }}}

    {{{ PhoneInput }}}

    {{{ PasswordInput }}}

    {{{ PasswordRepeatInput }}}
  
    {{{ SubmitButton }}}

    {{{ LoginLink }}}
  
  {{/ AuthLayout}}
`
