import { Block } from '@/core'
import { Button, AuthInput, Link } from '@/components'
import { FormControlService } from '@/services'

import { registerPageTemplate } from './register.tmpl'

import styles from './register.module.scss'

type RegisterPageChildren = {
  EmailInput: AuthInput
  LoginInput: AuthInput
  FirstNameInput: AuthInput
  SecondNameInput: AuthInput
  PhoneInput: AuthInput
  PasswordInput: AuthInput
  PasswordRepeatInput: AuthInput
  SubmitButton: Button
  LoginLink: Link
}
export class RegisterPage extends Block<{}, {}, RegisterPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      children: {
        EmailInput: new AuthInput({
          type: 'email',
          name: 'email',
          placeholder: 'Почта',
          label: 'Почта',
          validator: 'email',
          errorListener: formValidationService.attachErrorHandler,
        }),

        LoginInput: new AuthInput({
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          label: 'Логин',
          validator: 'login',
          errorListener: formValidationService.attachErrorHandler,
        }),

        FirstNameInput: new AuthInput({
          type: 'text',
          name: 'first_name',
          placeholder: 'Имя',
          label: 'Имя',
          validator: 'name',
          errorListener: formValidationService.attachErrorHandler,
        }),

        SecondNameInput: new AuthInput({
          type: 'text',
          name: 'second_name',
          placeholder: 'Фамилия',
          label: 'Фамилия',
          validator: 'name',
          errorListener: formValidationService.attachErrorHandler,
        }),

        PhoneInput: new AuthInput({
          type: 'tel',
          name: 'phone',
          placeholder: 'Телефон',
          label: 'Телефон',
          validator: 'phone',
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

        PasswordRepeatInput: new AuthInput({
          type: 'password',
          name: 'password_repeat',
          placeholder: 'Пароль (ещё раз)',
          label: 'Пароль (ещё раз)',
          validator: 'password',
          errorListener: formValidationService.attachErrorHandler,
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

  render(): string {
    return registerPageTemplate
  }

  componentDidMount(): void {
    this.formControlService.init(this.getContent())
  }
}
