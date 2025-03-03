import { Block } from '@/core'
import { AvataButton, BackLink, Button, ProfileInputField } from '@/components'
import { FormControlService } from '@/services'

import { user } from '../mockData'

import styles from './profileEdit.module.scss'

type ProfileEditPageChildren = {
  BackLink: BackLink
  AvataButton: AvataButton
  EmailInput: ProfileInputField
  LoginInput: ProfileInputField
  FirstNameInput: ProfileInputField
  SecondNameInput: ProfileInputField
  DisplayNameInput: ProfileInputField
  PhoneInput: ProfileInputField
  SubmitButton: Button
}

export class ProfileEditPage extends Block<{}, {}, ProfileEditPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      children: {
        BackLink: new BackLink(),
        AvataButton: new AvataButton({ disabled: true }),
        EmailInput: new ProfileInputField({
          type: 'email',
          name: 'email',
          label: 'Почта',
          value: user.email,
          errorListener: formValidationService.validate('email'),
        }),
        LoginInput: new ProfileInputField({
          type: 'text',
          name: 'login',
          label: 'Логин',
          value: user.login,
          errorListener: formValidationService.validate('login'),
        }),
        FirstNameInput: new ProfileInputField({
          type: 'text',
          name: 'first_name',
          label: 'Имя',
          value: user.first_name,
          errorListener: formValidationService.validate('name'),
        }),
        SecondNameInput: new ProfileInputField({
          type: 'text',
          name: 'second_name',
          label: 'Фамилия',
          value: user.second_name,
          errorListener: formValidationService.validate('name'),
        }),
        DisplayNameInput: new ProfileInputField({
          type: 'text',
          name: 'display_name',
          label: 'Имя в чате',
          value: user.display_name,
          errorListener: formValidationService.validate('name'),
        }),
        PhoneInput: new ProfileInputField({
          type: 'text',
          name: 'phone',
          label: 'Телефон',
          value: user.phone,
          errorListener: formValidationService.validate('phone'),
        }),
        SubmitButton: new Button({
          type: 'submit',
          label: 'Сохранить',
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
      {{#> ProfileLayout}}
        <form class=${styles.form}>
          {{{ EmailInput }}}

          {{{ LoginInput }}}

          {{{ FirstNameInput }}}

          {{{ SecondNameInput }}}

          {{{ DisplayNameInput }}}

          {{{ PhoneInput }}}

          {{{ SubmitButton }}} 
        </form>   
      {{/ ProfileLayout}}
    `
  }
}
