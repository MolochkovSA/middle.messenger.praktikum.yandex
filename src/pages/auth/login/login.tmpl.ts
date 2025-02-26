export const loginPageTemplate = `
  {{#> AuthLayout title="Вход" linkLabel="Нет аккаунта?" linkTo="/register"}}
    {{{ LoginInput }}}

    {{{ PasswordInput }}}

    {{{ SubmitButton }}}

    {{{ RegisterLink }}}
  {{/ AuthLayout}}
`

// {{> AuthInput
//  id="loginInput"
//  type="text"
//  name="login"
//  label="Логин"
//  errorMessage=login.errorMessage
//  value=login.value
// }}

// {{> AuthInput
//  id="passwordInput"
//  type="password"
//  name="password"
//  label="Пароль"
//  errorMessage=password.errorMessage
//  value=password.value
// }}

// {{#> Button id=buttonId type="submit" className="${styles.button}"}}
//   {{buttonLabel}}
// {{/ Button}}

// {{#> Link className="${styles.link}" data-page=linkTo}}
//   {{linkLabel}}
// {{/ Link}}
