import { Block } from '@/core'
import { Link } from '@/components'

import styles from './navigation.module.scss'
import { RoutePath } from '@/config/routeConfig'

export class NavigationPage extends Block {
  constructor() {
    super({
      children: {
        Links: links.map(({ to, label }) => new Link({ to, label, className: styles.link })),
      },
    })
  }

  render() {
    return `
      <main>
        <h1 class=${styles.title}>Навигация по проекту:</h1>
        
        <nav>
          <ul>
            {{#each Links as |link|}}
              <li>{{{ link }}}</li>
            {{/each}}  
          </ul>    
        </nav>
      </main>
    `
  }
}

const links: { to: `${RoutePath}`; label: string }[] = [
  { to: '/sign-in', label: 'Страница авторизации' },
  { to: '/sign-up', label: 'Страница регистрации' },
  { to: '/messenger', label: 'Страница чата' },
  { to: '/profile', label: 'Страница просмотра профиля' },
  { to: '/settings', label: 'Страница редактирования профиля' },
  { to: '/reset-password', label: 'Страница изменения пароля' },
  { to: '*', label: 'Страница ошибки 404' },
  { to: '/server-error', label: 'Страница ошибки 500' },
]
