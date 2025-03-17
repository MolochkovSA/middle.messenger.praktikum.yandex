import { Block } from '@/core'
import { AvataButton, BackLink, Button, ProfileInputField } from '@/components'
import { FormControlService } from '@/services'

import styles from './profilePassword.module.scss'

type ProfilePasswordPageChildren = {
  BackLink: BackLink
  AvataButton: AvataButton
  OldPasswordInput: ProfileInputField
  NewPasswordInput: ProfileInputField
  NewPasswordRepeatInput: ProfileInputField
  SubmitButton: Button
}

export class ProfilePasswordPage extends Block<{}, {}, ProfilePasswordPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      children: {
        BackLink: new BackLink(),
        AvataButton: new AvataButton({ disabled: true }),
        OldPasswordInput: new ProfileInputField({
          type: 'password',
          name: 'oldPassword',
          label: 'Старый пароль',
          errorListener: formValidationService.validate('password'),
        }),
        NewPasswordInput: new ProfileInputField({
          type: 'password',
          name: 'newPassword',
          label: 'Новый пароль',
          errorListener: formValidationService.validate('equalPassword'),
        }),
        NewPasswordRepeatInput: new ProfileInputField({
          type: 'password',
          name: 'newPasswordRepeat',
          label: 'Повторите новый пароль',
          errorListener: formValidationService.validate('equalPassword'),
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
    this.formControlService.getElements(this.getContent())
  }

  render(): string {
    return `
      {{#> ProfileLayout}}
        <form class=${styles.form}>
          {{{ OldPasswordInput }}}

          {{{ NewPasswordInput }}}

          {{{ NewPasswordRepeatInput }}}

          {{{ SubmitButton }}} 
        </form>   
      {{/ ProfileLayout}}
    `
  }
}
