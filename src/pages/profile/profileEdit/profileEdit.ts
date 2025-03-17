import { Block, Router } from '@/core'
import { AvataButton, BackLink, Button, ProfileInputField } from '@/components'
import { FormControlService } from '@/services'
import { User } from '@/types'

import styles from './profileEdit.module.scss'

type ProfileEditPageProps = {
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}

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

export class ProfileEditPage extends Block<ProfileEditPageProps, {}, ProfileEditPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      props: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
      },
      children: {
        BackLink: new BackLink(),
        AvataButton: new AvataButton({ disabled: true }),
        EmailInput: new ProfileInputField({
          type: 'email',
          name: 'email',
          label: 'Почта',
          errorListener: formValidationService.validate('email'),
        }),
        LoginInput: new ProfileInputField({
          type: 'text',
          name: 'login',
          label: 'Логин',
          errorListener: formValidationService.validate('login'),
        }),
        FirstNameInput: new ProfileInputField({
          type: 'text',
          name: 'first_name',
          label: 'Имя',
          errorListener: formValidationService.validate('name'),
        }),
        SecondNameInput: new ProfileInputField({
          type: 'text',
          name: 'second_name',
          label: 'Фамилия',
          errorListener: formValidationService.validate('name'),
        }),
        DisplayNameInput: new ProfileInputField({
          type: 'text',
          name: 'display_name',
          label: 'Имя в чате',
          errorListener: formValidationService.validate('name'),
        }),
        PhoneInput: new ProfileInputField({
          type: 'text',
          name: 'phone',
          label: 'Телефон',
          errorListener: formValidationService.validate('phone'),
        }),
        SubmitButton: new Button({
          type: 'submit',
          label: 'Сохранить',
          click: () => {
            console.log(12313)
          },
        }),
      },
    })

    this.formControlService = formValidationService
  }

  componentDidMount(): void {
    this.formControlService.init(this.getContent())

    const user = Router.getLoaderData<User>()
    if (!user) return
    // this.setProps(user)
  }

  render(): string {
    Object.values(this.getChildren()).forEach((child) => {
      if (!(child instanceof ProfileInputField)) return
      const key = child.getProps().name
      if (!key) return
      const value = this.getProps()[key as keyof ProfileEditPageProps]
      child.setProps({ value })
    })

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
