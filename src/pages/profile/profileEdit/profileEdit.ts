import { Block } from '@/core'
import { AvataButton, BackLink, Button, ProfileInputField } from '@/components'
import { FormControlService } from '@/services'

import { profileEditPageTemplate } from './profileEdit.tmpl'
import { user } from '../mockData'

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
        }),
        LoginInput: new ProfileInputField({
          type: 'text',
          name: 'login',
          label: 'Логин',
          value: user.login,
        }),
        FirstNameInput: new ProfileInputField({
          type: 'text',
          name: 'first_name',
          label: 'Имя',
          value: user.first_name,
        }),
        SecondNameInput: new ProfileInputField({
          type: 'text',
          name: 'second_name',
          label: 'Фамилия',
          value: user.second_name,
        }),
        DisplayNameInput: new ProfileInputField({
          type: 'text',
          name: 'display_name',
          label: 'Имя в чате',
          value: user.display_name,
        }),
        PhoneInput: new ProfileInputField({
          type: 'text',
          name: 'phone',
          label: 'Телефон',
          value: user.phone,
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
    return profileEditPageTemplate
  }

  componentDidMount(): void {
    this.formControlService.init(this.getContent())
  }
}
