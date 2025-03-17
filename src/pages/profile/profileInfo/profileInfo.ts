import { Block, Router } from '@/core'
import { AvataButton, BackLink, Link, ProfileInputField } from '@/components'

import styles from './profileInfo.module.scss'
import { authController } from '@/controllers'
import { RoutePath } from '@/config/routeConfig'
import { logger } from '@/services'
import { User } from '@/types'

type ProfileInfoProps = {
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}

type ProfileInfoPageChildren = {
  BackLink: BackLink
  AvataButton: AvataButton
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

  constructor() {
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
        AvataButton: new AvataButton(),
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
    this.setProps(user)
  }

  render(): string {
    Object.values(this.getChildren()).forEach((child) => {
      if (!(child instanceof ProfileInputField)) return
      const key = child.getProps().name
      if (!key) return
      const value = this.getProps()[key as keyof ProfileInfoProps]
      child.setProps({ value })
    })

    return `
      {{#> ProfileLayout}}
        <h2 class=${styles.title}>{{ title }}</h2>

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
