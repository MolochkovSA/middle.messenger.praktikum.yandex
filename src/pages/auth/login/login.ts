import { Block, Router } from '@/core'
import { Button, AuthInputField, Link } from '@/components'
import { FormControlService } from '@/services'
import { AuthApi } from '@/api/authApi'
import { RoutePath } from '@/config/routeConfig'

import styles from './login.module.scss'

type LoginPageChildren = {
  LoginInput: AuthInputField
  PasswordInput: AuthInputField
  SubmitButton: Button
  RegisterLink: Link
}
export class LoginPage extends Block<{}, {}, LoginPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      children: {
        LoginInput: new AuthInputField({
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          label: 'Логин',
          errorListener: formValidationService.validate('login'),
        }),

        PasswordInput: new AuthInputField({
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          label: 'Пароль',
          errorListener: formValidationService.validate('password'),
        }),

        SubmitButton: new Button({
          type: 'submit',
          label: 'Авторизоваться',
          className: styles.button,
        }),

        RegisterLink: new Link({
          label: 'Нет аккаунта?',
          className: styles.link,
          to: '/sign-up',
        }),
      },
    })

    this.formControlService = formValidationService
  }

  componentDidMount(): void {
    this.formControlService.init(this.getContent())
    this.formControlService.attachSubmitHandler(({ formData }) => {
      const authApi = new AuthApi()
      authApi
        .signIn({
          login: formData.get('login') as string,
          password: formData.get('password') as string,
        })
        .then(() => Router.navigate(RoutePath.CHAT))
    })
  }

  render(): string {
    return `
      {{#> AuthLayout title="Вход"}}
        {{{ LoginInput }}}

        {{{ PasswordInput }}}

        {{{ SubmitButton }}}

        {{{ RegisterLink }}}
      {{/ AuthLayout}}
    `
  }
}
