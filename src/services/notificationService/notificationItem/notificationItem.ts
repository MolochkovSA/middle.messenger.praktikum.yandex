import { Block } from '@/core'

import { Notification, NotificationType } from '../types'

import styles from './notificationItem.module.scss'

type NotificationItemEvents = {
  click: () => void
}

export class NotificationItem extends Block<Notification, NotificationItemEvents> {
  private _timeout?: NodeJS.Timeout

  constructor({ message, type }: Notification) {
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
    clearTimeout(this._timeout)
    this.dispatchComponentWillUnmount()
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
