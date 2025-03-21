import { Block } from '@/core'
import { Link } from '@/components'

import { errorPageTemplate } from '../template/errorPage.tmpl'

import styles from '../template/errorPage.module.scss'

type NotFoundPageProps = {
  code: number
  description: string
}

type NotFoundPageChildren = {
  BackLink: Link
}

export class NotFoundPage extends Block<NotFoundPageProps, {}, NotFoundPageChildren> {
  constructor() {
    super({
      props: { code: 404, description: 'Страница не найдена' },
      children: {
        BackLink: new Link({
          label: 'Назад к чатам',
          className: styles.link,
          to: '/messenger',
        }),
      },
    })
  }
  render(): string {
    return errorPageTemplate
  }
}
