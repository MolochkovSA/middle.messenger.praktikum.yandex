import { Block, Router } from '@/core'
import { AvataButton, BackLink, Button, ProfileInputField } from '@/components'
import { FormControlService } from '@/services'
import { User } from '@/types'

import styles from './profileEdit.module.scss'

type ProfileEditPageProps = {
  user?: User
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
      props: {},
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
          errorListener: formValidationService.validate('optionalName'),
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
        }),
      },
    })

    this.formControlService = formValidationService
  }

  protected componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
    this.formControlService.attachSubmitHandler(this.handleSubmit.bind(this))

    const user = Router.getLoaderData<User>()
    if (user) this.setProps({ user })
  }

  protected componentWillUpdate(): void {
    this.formControlService.removeEvents()
  }

  protected componentDidUpdate(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
  }

  protected componentWillUnmount(): void {
    this.formControlService.removeEvents()
    this.formControlService.unmount()
  }

  handleSubmit(event: Event, formData: FormData): void {
    event.preventDefault()

    const newData = {
      email: formData.get('email')?.toString(),
      login: formData.get('login')?.toString(),
      first_name: formData.get('first_name')?.toString(),
      second_name: formData.get('second_name')?.toString(),
      display_name: formData.get('display_name') ? formData.get('display_name')?.toString() : undefined,
      phone: formData.get('phone')?.toString(),
    }

    console.log(newData)
  }

  render(): string {
    Object.values(this.getChildren()).forEach((child) => {
      if (!(child instanceof ProfileInputField)) return
      const key = child.getProps().name
      if (!key) return
      const value = this.getProps().user?.[key as keyof Omit<User, 'id'>]
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
