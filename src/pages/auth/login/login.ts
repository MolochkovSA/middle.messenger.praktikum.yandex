import { Block } from '@/core'
import { Button, AuthInput, Link } from '@/components'

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
  constructor() {
    const state: LoginPageState = {
      login: '',
      password: '',
      errors: {},
    }

    super({
      tagName: 'div',
      props: {
        state,
      },
      children: {
        LoginInput: new AuthInput({
          value: state.login,
          errorMessage: state.errors.login,
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          label: 'Логин',
          disabled: false,
          onChange: (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
              const prevState = this.getProps().state as LoginPageState
              this.setProps({ state: { ...prevState, login: e.target.value } })
            }
          },
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
          onClick: (e: Event) => {
            e.preventDefault()
            console.log(this.getProps().state)
          },
        }),

        RegisterLink: new Link({
          label: 'Нет аккаунта?',
          className: styles.link,
          to: '/',
        }),
      },
    })
  }

  render(): string {
    return loginPageTemplate
  }
}
