import { Block } from '@/core'
import { AvataButton, BackLink, Button, Loader, ProfileInputField } from '@/components'
import { FormControlService, NotificationService } from '@/services'
import { withIsLoading } from '@/store/user'
import { ResetPasswordDto } from '@/types/user'
import { userController } from '@/controllers'

import styles from './profilePassword.module.scss'

type ProfilePasswordPageProps = {
  isLoading: boolean
}

type ProfilePasswordPageChildren = {
  BackLink: BackLink
  AvataButton: AvataButton
  OldPasswordInput: ProfileInputField
  NewPasswordInput: ProfileInputField
  NewPasswordRepeatInput: ProfileInputField
  SubmitButton: Button
  Loader: Loader
}

class ProfilePasswordPage extends Block<ProfilePasswordPageProps, {}, ProfilePasswordPageChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      props: {
        isLoading: false,
      },
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
        Loader: new Loader({ className: styles.loader }),
      },
    })

    this.formControlService = formValidationService
  }

  protected componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
    this.formControlService.attachSubmitHandler(this.handleSubmit.bind(this))
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
    const { isLoading } = this.getProps()
    const { OldPasswordInput, NewPasswordInput, NewPasswordRepeatInput, SubmitButton } = this.getChildren()

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

export default withIsLoading(ProfilePasswordPage)
