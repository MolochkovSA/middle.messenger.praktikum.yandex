import { Block } from '@/core'
import { Button, AuthInput, Link } from '@/components'
import { FormValidationService } from '@/utils'

import { loginPageTemplate } from './login.tmpl'

import styles from './login.module.scss'

type LoginPageState = {
  login: string
  password: string
  errors: {
    login?: string
    password?: string
  }
}

type LoginPageProps = {
  state: LoginPageState
}

type LoginPageChildren = {
  LoginInput: AuthInput
  PasswordInput: AuthInput
  SubmitButton: Button
  RegisterLink: Link
}
export class LoginPage extends Block<LoginPageProps, {}, LoginPageChildren> {
  private formValidationService: FormValidationService

  constructor() {
    const formValidationService = new FormValidationService()
    const state: LoginPageState = {
      login: '',
      password: '',
      errors: {},
    }

    super({
      props: {
        state,
      },
      children: {
        LoginInput: new AuthInput({
          value: state.login,
          errorMessage: state.errors.login,
          isError: true,
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          label: 'Логин',
          disabled: false,
          errorEmitter: formValidationService.errorEventOn,
        }),

        PasswordInput: new AuthInput({
          value: state.password,
          errorMessage: state.errors.password,
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          label: 'Пароль',
          disabled: false,
          errorEmitter: formValidationService.errorEventOn,
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

    this.formValidationService = formValidationService
  }

  render(): string {
    return loginPageTemplate
  }

  componentDidMount(): void {
    this.formValidationService.log(this.getContent())
  }
}
