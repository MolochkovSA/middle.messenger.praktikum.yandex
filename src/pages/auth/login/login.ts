import { Block } from '@/core'
import { Button, AuthInput, Link } from '@/components'
import { FormControlService } from '@/services'

import { loginPageTemplate } from './login.tmpl'

import styles from './login.module.scss'

type LoginPageChildren = {
  LoginInput: AuthInput
  PasswordInput: AuthInput
  SubmitButton: Button
  RegisterLink: Link
}
export class LoginPage extends Block<{}, {}, LoginPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      children: {
        LoginInput: new AuthInput({
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          label: 'Логин',
          validator: 'login',
          errorListener: formValidationService.attachErrorHandler,
        }),

        PasswordInput: new AuthInput({
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
          to: '/',
        }),
      },
    })

    this.formControlService = formValidationService
  }

  render(): string {
    return loginPageTemplate
  }

  componentDidMount(): void {
    this.formControlService.init(this.getContent())
  }
}
