import { Block, Router } from '@/core'
import { AvatarButton, BackLink, Button, Loader, ProfileInputField } from '@/components'
import { FormControlService, NotificationService } from '@/services'
import { ResetPasswordDto, User } from '@/types/user'
import { userController } from '@/controllers'
import { connect } from '@/store/connect'

import styles from './profilePassword.module.scss'

type ProfilePasswordPageProps = {
  avatar?: string
  isLoading: boolean
}

type ProfilePasswordPageChildren = {
  BackLink: BackLink
  AvatarButton: AvatarButton
  OldPasswordInput: ProfileInputField
  NewPasswordInput: ProfileInputField
  NewPasswordRepeatInput: ProfileInputField
  SubmitButton: Button
  Loader: Loader
}

export class ProfilePasswordPage extends Block<ProfilePasswordPageProps, {}, ProfilePasswordPageChildren> {
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
        OldPasswordInput: new ProfileInputField({
          type: 'password',
          name: 'oldPassword',
          label: 'Старый пароль',
          placeholder: 'Введите старый пароль',
          errorListener: formValidationService.validate('password'),
        }),
        NewPasswordInput: new ProfileInputField({
          type: 'password',
          name: 'newPassword',
          label: 'Новый пароль',
          placeholder: 'Введите новый пароль',
          errorListener: formValidationService.validate('equalPassword'),
        }),
        NewPasswordRepeatInput: new ProfileInputField({
          type: 'password',
          name: 'newPasswordRepeat',
          label: 'Повторите новый пароль',
          placeholder: 'Повторите новый пароль',
          errorListener: formValidationService.validate('equalPassword'),
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

  protected componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
    this.formControlService.attachSubmitHandler(this.handleSubmit.bind(this))

    const user = Router.getLoaderData<User>()
    if (user) this.setProps({ avatar: user.avatar ?? undefined })
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

    const oldPassword = formData.get('oldPassword')!.toString()
    const newPassword = formData.get('newPassword')!.toString()

    if (!oldPassword || !newPassword) {
      return NotificationService.notify('Заполните все поля', 'error')
    }

    const newData: ResetPasswordDto = { oldPassword, newPassword }

    userController.resetPassword(newData)
  }

  render(): string {
    const { isLoading, avatar } = this.getProps()
    const { AvatarButton, OldPasswordInput, NewPasswordInput, NewPasswordRepeatInput, SubmitButton } =
      this.getChildren()

    AvatarButton.setProps({ avatar: avatar })
    OldPasswordInput.setProps({ disabled: isLoading })
    NewPasswordInput.setProps({ disabled: isLoading })
    NewPasswordRepeatInput.setProps({ disabled: isLoading })
    SubmitButton.setProps({ disabled: isLoading })

    return `
      {{#> ProfileLayout}}
        {{#if isLoading }}
          {{{ Loader }}}
        {{else}}
          <form class=${styles.form}>
            {{{ OldPasswordInput }}}

            {{{ NewPasswordInput }}}

            {{{ NewPasswordRepeatInput }}}

            {{{ SubmitButton }}} 
          </form>   
        {{/if}}
      {{/ ProfileLayout}}
    `
  }
}

export const ProfilePasswordPageWithState = connect<ProfilePasswordPageProps, {}, ProfilePasswordPageChildren>(
  (state) => ({ isLoading: state.user.isLoading })
)(ProfilePasswordPage)
