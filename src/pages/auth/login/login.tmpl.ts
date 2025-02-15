import { AuthInputProps } from '../../../components'

import styles from './login.module.scss'

type InputProps = Pick<AuthInputProps, 'value' | 'errorMessage'>

export type LoginProps = {
  login: InputProps
  password: InputProps
}

export const Login = `
  {{#> AuthLayout title="Вход" buttonLabel="Авторизоваться" linkLabel="Нет аккаунта?" linkTo="/register"}}
    {{> AuthInput id="loginInput" type="text" name="login" label="Логин" errorMessage=login.errorMessage value=login.value}}
    {{> AuthInput id="passwordInput" type="password" name="password" label="Пароль" errorMessage=password.errorMessage value=password.value}}
     
    {{#> Button id=buttonId type="submit" className="${styles.button}"}}
      {{buttonLabel}}
    {{/ Button}}

    {{#> Link className="${styles.link}" data-page=linkTo}}
      {{linkLabel}}
    {{/ Link}}
  {{/ AuthLayout}}
`
