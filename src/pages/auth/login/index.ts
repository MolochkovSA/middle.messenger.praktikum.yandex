import Handlebars from 'handlebars'

import { Login, LoginProps } from './login.tmpl'

export const LoginPage = () => {
  const state: LoginProps = {
    login: { value: 'ivanivanov', errorMessage: 'Неверный логин' },
    password: {},
  }

  return Handlebars.compile<LoginProps>(Login)(state)
}
