import { Block } from '@/core'
import { Button, AuthInputField, Link } from '@/components'
import { FormControlService } from '@/services'
import { authController } from '@/controllers'

import styles from './register.module.scss'
import { withAuthState } from '@/store/auth'

type LoginPageProps = {
  isLoading: boolean
}

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
class RegisterPage extends Block<LoginPageProps, {}, RegisterPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      props: {
        isLoading: false,
      },
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
          to: '/sign-in',
        }),
      },
    })

    this.formControlService = formValidationService
  }

  componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.attachSubmitHandler(authController.register)
  }

  componentWillUnmount(): void {
    this.formControlService.unmount()
  }

  render(): string {
    const { isLoading } = this.getProps()
    const {
      EmailInput,
      LoginInput,
      FirstNameInput,
      SecondNameInput,
      PhoneInput,
      PasswordInput,
      PasswordRepeatInput,
      SubmitButton,
    } = this.getChildren()

    EmailInput.setProps({ disabled: isLoading })
    LoginInput.setProps({ disabled: isLoading })
    FirstNameInput.setProps({ disabled: isLoading })
    SecondNameInput.setProps({ disabled: isLoading })
    PhoneInput.setProps({ disabled: isLoading })
    PasswordInput.setProps({ disabled: isLoading })
    PasswordRepeatInput.setProps({ disabled: isLoading })
    SubmitButton.setProps({ disabled: isLoading })

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

export default withAuthState(RegisterPage)
