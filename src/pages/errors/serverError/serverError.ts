import { Block } from '@/core'
import { Link } from '@/components'

import { errorPageTemplate } from '../template/errorPage.tmpl'

import styles from '../template/errorPage.module.scss'

type ServerErrorPageProps = {
  code: number
  description: string
}

type ServerErrorPageChildren = {
  BackLink: Link
}

export class ServerErrorPage extends Block<ServerErrorPageProps, {}, ServerErrorPageChildren> {
  constructor() {
    super({
      props: { code: 500, description: 'Мы уже фиксим' },
      children: {
        BackLink: new Link({
          label: 'Назад к чатам',
          className: styles.link,
          to: '/',
        }),
      },
    })
  }
  render(): string {
    return errorPageTemplate
  }
}
