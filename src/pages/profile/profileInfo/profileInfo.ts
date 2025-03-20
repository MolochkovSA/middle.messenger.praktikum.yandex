import { Block, Router } from '@/core'
import { AvatarButton, BackLink, Link, ProfileInputField } from '@/components'
import { authController } from '@/controllers'
import { RoutePath } from '@/config/routeConfig'
import { logger } from '@/services'
import { User } from '@/types/user'
import { connect } from '@/store/connect'

import styles from './profileInfo.module.scss'

type ProfileInfoProps = {
  user?: User
}

type ProfileInfoPageChildren = {
  BackLink: BackLink
  AvatarButton: AvatarButton
  EmailInput: ProfileInputField
  LoginInput: ProfileInputField
  FirstNameInput: ProfileInputField
  SecondNameInput: ProfileInputField
  DisplayNameInput: ProfileInputField
  PhoneInput: ProfileInputField
  ProfileChangeLink: Link
  PasswordChangeLink: Link
  LogoutLink: Link
}

export class ProfileInfoPage extends Block<ProfileInfoProps, {}, ProfileInfoPageChildren> {
  private _context = ProfileInfoPage.name

  constructor({ user }: ProfileInfoProps = {}) {
    super({
      props: {
        user,
      },
      children: {
        BackLink: new BackLink(),
        AvatarButton: new AvatarButton(),
        EmailInput: new ProfileInputField({
          type: 'email',
          name: 'email',
          label: 'Почта',
          disabled: true,
        }),
        LoginInput: new ProfileInputField({
          type: 'text',
          name: 'login',
          label: 'Логин',
          disabled: true,
        }),
        FirstNameInput: new ProfileInputField({
          type: 'text',
          name: 'first_name',
          label: 'Имя',
          disabled: true,
        }),
        SecondNameInput: new ProfileInputField({
          type: 'text',
          name: 'second_name',
          label: 'Фамилия',
          disabled: true,
        }),
        DisplayNameInput: new ProfileInputField({
          type: 'text',
          name: 'display_name',
          label: 'Имя в чате',
          disabled: true,
        }),
        PhoneInput: new ProfileInputField({
          type: 'text',
          name: 'phone',
          label: 'Телефон',
          disabled: true,
        }),
        ProfileChangeLink: new Link({
          label: 'Изменить данные',
          to: RoutePath.SETTINGS,
        }),
        PasswordChangeLink: new Link({
          label: 'Изменить пароль',
          to: RoutePath.RESET_PASSWORD,
        }),
        LogoutLink: new Link({
          label: 'Выйти',
          to: '#',
          click: async (e) => {
            e.preventDefault()
            logger.debug(this._context, 'logout click')
            await authController.logout()
            Router.navigate(RoutePath.LOGIN)
          },
        }),
      },
    })
  }

  protected componentDidMount(): void {
    const user = Router.getLoaderData<User>()
    if (!user) return

    this.setProps({ user })
  }

  render(): string {
    const { user } = this.getProps()
    const { AvatarButton, EmailInput, LoginInput, FirstNameInput, SecondNameInput, DisplayNameInput, PhoneInput } =
      this.getChildren()

    AvatarButton.setProps({ avatar: user?.avatar ?? undefined })
    EmailInput.setProps({ value: user?.email })
    LoginInput.setProps({ value: user?.login })
    FirstNameInput.setProps({ value: user?.first_name })
    SecondNameInput.setProps({ value: user?.second_name })
    DisplayNameInput.setProps({ value: user?.display_name ?? undefined })
    PhoneInput.setProps({ value: user?.phone })

    return `
      {{#> ProfileLayout}}
        <h2 class=${styles.title}>{{ display_name }}</h2>

        <form class=${styles.form}>
          {{{ EmailInput }}}

          {{{ LoginInput }}}

          {{{ FirstNameInput }}}

          {{{ SecondNameInput }}}

          {{{ DisplayNameInput }}}

          {{{ PhoneInput }}}
        </form>

        {{{ ProfileChangeLink }}}

        {{{ PasswordChangeLink }}}

        {{{ LogoutLink }}}
      {{/ ProfileLayout}}
    `
  }
}

export const ProfileInfoPageWithState = connect<ProfileInfoProps, {}, ProfileInfoPageChildren>((state) => {
  const user = state.user.user
  return user ? { ...user } : {}
})(ProfileInfoPage)
