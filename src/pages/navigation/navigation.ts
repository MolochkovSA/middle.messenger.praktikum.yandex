import { Block } from '@/core'
import {  Link } from '@/components'

import { navigationTemplate } from './navigation.tmpl'

import styles from './navigation.module.scss'

export class NavigationPage extends Block {
  constructor() {
    super({
      children: {
        Links: links.map(({ to, label }) => new Link({ to, label, className: styles.link })),
       
      },
    })
  }

  render() {
    return navigationTemplate
  }
}

const links: { to: string; label: string }[] = [
  { to: '/login', label: 'Страница авторизации' },
  { to: '/register', label: 'Страница регистрации' },
  { to: '/chat', label: 'Страница чата' },
  { to: '/profile', label: 'Страница просмотра профиля' },
  { to: '/profile/edit', label: 'Страница редактирования профиля' },
  { to: '/profile/password', label: 'Страница изменения пароля' },
  { to: '/not-found', label: 'Страница ошибки 404' },
  { to: '/server-error', label: 'Страница ошибки 500' },
]
