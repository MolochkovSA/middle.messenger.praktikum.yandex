import { Block } from '@/core'
import { Button, AuthInputField, Link } from '@/components'
import { FormControlService, NotificationService } from '@/services'
import { authController } from '@/controllers'
import { connect } from '@/store/connect'
import { SignInDto } from '@/types/user'

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
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
    this.formControlService.attachSubmitHandler(this.handleSubmit.bind(this))
  }

  componentWillUpdate(): void {
    this.formControlService.removeEvents()
  }

  componentDidUpdate(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
  }

  componentWillUnmount(): void {
    this.formControlService.removeEvents()
    this.formControlService.unmount()
  }

  handleSubmit(event: Event, formData: FormData): void {
    event.preventDefault()

    const login = formData.get('login')?.toString()
    const password = formData.get('password')?.toString()

    if (!login || !password) {
      return NotificationService.notify('Заполните все поля', 'error')
    }

    const newData: SignInDto = { login, password }

    authController.login(newData)
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

export const LoginPageWithState = connect((state) => ({ isLoading: state.user.isLoading }))(LoginPage)
