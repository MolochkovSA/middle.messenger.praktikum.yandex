import { Block } from '@/core'
import { AvataButton, BackLink, Link, ProfileInputField } from '@/components'

import { user } from '../mockData'

import styles from './profileInfo.module.scss'

type ProfileInfoProps = {
  title: string
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
  constructor() {
    super({
      props: {
        title: user.display_name,
      },
      children: {
        BackLink: new BackLink(),
        AvataButton: new AvataButton(),
        EmailInput: new ProfileInputField({
          type: 'email',
          name: 'email',
          label: 'Почта',
          value: user.email,
          disabled: true,
        }),
        LoginInput: new ProfileInputField({
          type: 'text',
          name: 'login',
          label: 'Логин',
          value: user.login,
          disabled: true,
        }),
        FirstNameInput: new ProfileInputField({
          type: 'text',
          name: 'first_name',
          label: 'Имя',
          value: user.first_name,
          disabled: true,
        }),
        SecondNameInput: new ProfileInputField({
          type: 'text',
          name: 'second_name',
          label: 'Фамилия',
          value: user.second_name,
          disabled: true,
        }),
        DisplayNameInput: new ProfileInputField({
          type: 'text',
          name: 'display_name',
          label: 'Имя в чате',
          value: user.display_name,
          disabled: true,
        }),
        PhoneInput: new ProfileInputField({
          type: 'text',
          name: 'phone',
          label: 'Телефон',
          value: user.phone,
          disabled: true,
        }),
        ProfileChangeLink: new Link({
          label: 'Изменить данные',
          to: '/profile/edit',
        }),
        PasswordChangeLink: new Link({
          label: 'Изменить пароль',
          to: '/profile/password',
        }),
        LogoutLink: new Link({
          label: 'Выйти',
          to: '/login',
        }),
      },
    })
  }

  render(): string {
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
