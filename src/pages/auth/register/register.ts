import { Block } from '@/core'
import { Button, AuthInputField, Link } from '@/components'
import { FormControlService } from '@/services'

import styles from './register.module.scss'

type RegisterPageChildren = {
  EmailInput: AuthInputField
  LoginInput: AuthInputField
  FirstNameInput: AuthInputField
  SecondNameInput: AuthInputField
  PhoneInput: AuthInputField
  PasswordInput: AuthInputField
  PasswordRepeatInput: AuthInputField
  SubmitButton: Button
  LoginLink: Link
}
export class RegisterPage extends Block<{}, {}, RegisterPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      children: {
        EmailInput: new AuthInputField({
          type: 'email',
          name: 'email',
          placeholder: 'Почта',
          label: 'Почта',
          errorListener: formValidationService.validate('email'),
        }),

        LoginInput: new AuthInputField({
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          label: 'Логин',
          errorListener: formValidationService.validate('login'),
        }),

        FirstNameInput: new AuthInputField({
          type: 'text',
          name: 'first_name',
          placeholder: 'Имя',
          label: 'Имя',
          errorListener: formValidationService.validate('name'),
        }),

        SecondNameInput: new AuthInputField({
          type: 'text',
          name: 'second_name',
          placeholder: 'Фамилия',
          label: 'Фамилия',
          errorListener: formValidationService.validate('name'),
        }),

        PhoneInput: new AuthInputField({
          type: 'tel',
          name: 'phone',
          placeholder: 'Телефон',
          label: 'Телефон',
          errorListener: formValidationService.validate('phone'),
        }),

        PasswordInput: new AuthInputField({
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          label: 'Пароль',
          errorListener: formValidationService.validate('equalPassword'),
        }),

        PasswordRepeatInput: new AuthInputField({
          type: 'password',
          name: 'password_repeat',
          placeholder: 'Пароль (ещё раз)',
          label: 'Пароль (ещё раз)',
          errorListener: formValidationService.validate('equalPassword'),
        }),

        SubmitButton: new Button({
          type: 'submit',
          label: 'Зарегистрироваться',
          className: styles.button,
        }),

        LoginLink: new Link({
          label: 'Войти',
          className: styles.link,
          to: '/login',
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
      {{#> AuthLayout title="Регистрация"}}
        {{{ EmailInput }}}

        {{{ LoginInput }}}

        {{{ FirstNameInput }}}

        {{{ SecondNameInput }}}

        {{{ PhoneInput }}}

        {{{ PasswordInput }}}

        {{{ PasswordRepeatInput }}}
      
        {{{ SubmitButton }}}

        {{{ LoginLink }}}
      
      {{/ AuthLayout}}
    `
  }
}
