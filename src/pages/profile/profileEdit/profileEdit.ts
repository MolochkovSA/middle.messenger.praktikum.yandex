import { Block, Router } from '@/core'
import { AvatarButton, BackLink, Button, Loader, ProfileInputField } from '@/components'
import { FormControlService, NotificationService } from '@/services'
import { User, UserUpdateDTO } from '@/types/user'
import { userController } from '@/controllers'
import { connect } from '@/store/connect'

import styles from './profileEdit.module.scss'

type ProfileEditPageProps = {
  user?: User
  isLoading: boolean
}

type ProfileEditPageChildren = {
  BackLink: BackLink
  AvatarButton: AvatarButton
  EmailInput: ProfileInputField
  LoginInput: ProfileInputField
  FirstNameInput: ProfileInputField
  SecondNameInput: ProfileInputField
  DisplayNameInput: ProfileInputField
  PhoneInput: ProfileInputField
  SubmitButton: Button
  Loader: Loader
}

export class ProfileEditPage extends Block<ProfileEditPageProps, {}, ProfileEditPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      props: {
        isLoading: false,
      },
      children: {
        BackLink: new BackLink(),
        AvatarButton: new AvatarButton({ disabled: true }),
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
        Loader: new Loader({ className: styles.loader }),
      },
    })

    this.formControlService = formValidationService
  }

  componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
    this.formControlService.attachSubmitHandler(this.handleSubmit.bind(this))

    const user = Router.getLoaderData<User>()
    if (user) this.setProps({ user })
  }

  componentWillUpdate(): void {
    this.formControlService.removeEvents()
  }

  componentDidUpdate(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
  }

  componentWillUnmount(): void {
    this.formControlService.removeEvents()
    this.formControlService.unmount()
  }

  handleSubmit(event: Event, formData: FormData): void {
    event.preventDefault()

    const email = formData.get('email')?.toString()
    const login = formData.get('login')?.toString()
    const first_name = formData.get('first_name')?.toString()
    const second_name = formData.get('second_name')?.toString()
    const display_name = formData.get('display_name') ? formData.get('display_name')?.toString() : undefined
    const phone = formData.get('phone')?.toString()

    if (!email || !login || !first_name || !second_name || !phone) {
      return NotificationService.notify('Заполните все поля', 'error')
    }

    const newData: UserUpdateDTO = { email, login, first_name, second_name, display_name: display_name ?? null, phone }

    userController.updateUser(newData)
  }

  render(): string {
    const { isLoading, user } = this.getProps()
    const {
      AvatarButton,
      EmailInput,
      LoginInput,
      FirstNameInput,
      SecondNameInput,
      DisplayNameInput,
      PhoneInput,
      SubmitButton,
    } = this.getChildren()

    AvatarButton.setProps({ avatar: user?.avatar ?? undefined })
    EmailInput.setProps({ disabled: isLoading, value: user?.email })
    LoginInput.setProps({ disabled: isLoading, value: user?.login })
    FirstNameInput.setProps({ disabled: isLoading, value: user?.first_name })
    SecondNameInput.setProps({ disabled: isLoading, value: user?.second_name })
    DisplayNameInput.setProps({ disabled: isLoading, value: user?.display_name ?? undefined })
    PhoneInput.setProps({ disabled: isLoading, value: user?.phone })
    SubmitButton.setProps({ disabled: isLoading })

    return `
      {{#> ProfileLayout}}
        {{#if isLoading }}
          {{{ Loader }}}
        {{else}}
          <form class=${styles.form}>
            {{{ EmailInput }}}

            {{{ LoginInput }}}

            {{{ FirstNameInput }}}

            {{{ SecondNameInput }}}

            {{{ DisplayNameInput }}}

            {{{ PhoneInput }}}

            {{{ SubmitButton }}} 
          </form>   
        {{/if}}
      {{/ ProfileLayout}}
    `
  }
}

export const ProfileEditPageWithState = connect<ProfileEditPageProps, {}, ProfileEditPageChildren>((state) => ({
  isLoading: state.user.isLoading,
  user: state.user.user ?? undefined,
}))(ProfileEditPage)
