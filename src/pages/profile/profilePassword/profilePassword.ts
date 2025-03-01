import { Block } from '@/core'
import { AvataButton, BackLink, Button, ProfileInputField } from '@/components'
import { FormControlService } from '@/services'

import { profilePasswordPageTemplate } from './profilePassword.tmpl'

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
          validator: 'password',
          errorListener: formValidationService.attachErrorHandler,
        }),
        NewPasswordInput: new ProfileInputField({
          type: 'password',
          name: 'newPassword',
          label: 'Новый пароль',
          validator: 'equalPassword',
          errorListener: formValidationService.attachErrorHandler,
        }),
        NewPasswordRepeatInput: new ProfileInputField({
          type: 'password',
          name: 'newPasswordRepeat',
          label: 'Повторите новый пароль',
          validator: 'equalPassword',
          errorListener: formValidationService.attachErrorHandler,
        }),
        SubmitButton: new Button({
          type: 'submit',
          label: 'Сохранить',
        }),
      },
    })

    this.formControlService = formValidationService
  }

  render(): string {
    return profilePasswordPageTemplate
  }

  componentDidMount(): void {
    this.formControlService.init(this.getContent())
  }
}
