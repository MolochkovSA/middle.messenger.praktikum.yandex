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
export class LoginPage extends Block {
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
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          label: 'Логин',
          disabled: false,
          errorEmitter: formValidationService.errorEventOn.bind(formValidationService),
        }),

        PasswordInput: new AuthInput({
          value: state.password,
          errorMessage: state.errors.password,
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          label: 'Пароль',
          disabled: false,
          onChange: (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
              const prevState = this.getProps().state as LoginPageState
              this.setProps({ state: { ...prevState, password: e.target.value } })
            }
          },
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
