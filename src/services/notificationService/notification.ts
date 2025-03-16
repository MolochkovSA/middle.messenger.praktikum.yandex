import { Block } from '@/core'

import { NotificationType } from './types'

import styles from './notification.module.scss'

type NotificationProps = {
  message: string
  type: NotificationType
}

type NotificationEvents = {
  click: () => void
}

export class NotificationComponent extends Block<NotificationProps, NotificationEvents> {
  private _timeout?: NodeJS.Timeout

  constructor({ message, type }: NotificationProps) {
    super({
      props: {
        message,
        type,
      },
      events: {
        click: () => this.hide(),
      },
    })
  }

  hide() {
    if (this._timeout) clearTimeout(this._timeout)
    this.setProps({ message: '', type: 'error' })
    this.componentWillUnmount()
  }

  render(): string {
    const notificationStyle: Record<NotificationType, string> = {
      error: styles.error,
    }

    if (this._timeout) clearTimeout(this._timeout)
    this._timeout = setTimeout(() => this.hide(), 5000)

    return `
      <div class="${styles.notification} ${notificationStyle[this.getProps().type]}" >
        <div class="${styles.loader}"></div>
        <span>{{message}}</span>
      </div>
     `
  }
}
