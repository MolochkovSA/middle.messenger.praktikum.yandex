import { Block } from '@/core'
import { Button, AuthInputField, Link } from '@/components'
import { FormControlService } from '@/services'
import { authController } from '@/controllers'

import styles from './login.module.scss'

type LoginPageProps = {
  isLoading: boolean
}

type LoginPageChildren = {
  LoginInput: AuthInputField
  PasswordInput: AuthInputField
  SubmitButton: Button
  RegisterLink: Link
}

export class LoginPage extends Block<LoginPageProps, {}, LoginPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      props: {
        isLoading: false,
      },
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
    this.formControlService.attachSubmitHandler(authController.login)
  }

  render(): string {
    const { isLoading } = this.getProps()
    const { LoginInput, PasswordInput, SubmitButton } = this.getChildren()

    LoginInput.setProps({ disabled: isLoading })
    PasswordInput.setProps({ disabled: isLoading })
    SubmitButton.setProps({ disabled: isLoading })

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
