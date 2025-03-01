import { Block } from '@/core'
import { Button, AuthInputField, Link } from '@/components'
import { FormControlService } from '@/services'

import { registerPageTemplate } from './register.tmpl'

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
          validator: 'email',
          errorListener: formValidationService.attachErrorHandler,
        }),

        LoginInput: new AuthInputField({
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          label: 'Логин',
          validator: 'login',
          errorListener: formValidationService.attachErrorHandler,
        }),

        FirstNameInput: new AuthInputField({
          type: 'text',
          name: 'first_name',
          placeholder: 'Имя',
          label: 'Имя',
          validator: 'name',
          errorListener: formValidationService.attachErrorHandler,
        }),

        SecondNameInput: new AuthInputField({
          type: 'text',
          name: 'second_name',
          placeholder: 'Фамилия',
          label: 'Фамилия',
          validator: 'name',
          errorListener: formValidationService.attachErrorHandler,
        }),

        PhoneInput: new AuthInputField({
          type: 'tel',
          name: 'phone',
          placeholder: 'Телефон',
          label: 'Телефон',
          validator: 'phone',
          errorListener: formValidationService.attachErrorHandler,
        }),

        PasswordInput: new AuthInputField({
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          label: 'Пароль',
          validator: 'equalPassword',
          errorListener: formValidationService.attachErrorHandler,
        }),

        PasswordRepeatInput: new AuthInputField({
          type: 'password',
          name: 'password_repeat',
          placeholder: 'Пароль (ещё раз)',
          label: 'Пароль (ещё раз)',
          validator: 'equalPassword',
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
