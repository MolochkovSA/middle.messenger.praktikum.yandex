import { Block } from '@/core'
import { Button, AuthInputField, Link } from '@/components'
import { FormControlService } from '@/services'

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
          validator: 'login',
          errorListener: formValidationService.attachErrorHandler,
        }),

        PasswordInput: new AuthInputField({
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          label: 'Пароль',
          validator: 'password',
          errorListener: formValidationService.attachErrorHandler,
        }),

        SubmitButton: new Button({
          type: 'submit',
          label: 'Авторизоваться',
          className: styles.button,
        }),

        RegisterLink: new Link({
          label: 'Нет аккаунта?',
          className: styles.link,
          to: '/register',
        }),
      },
    })

    this.formControlService = formValidationService
  }

  componentDidMount(): void {
    this.formControlService.init(this.getContent())
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
