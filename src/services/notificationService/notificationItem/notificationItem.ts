import { Block } from '@/core'

import { Notification } from '../types'

import styles from './notificationItem.module.scss'

type NotificationItemEvents = {
  click: () => void
}

export class NotificationItem extends Block<Notification, NotificationItemEvents> {
  private static _timeout?: NodeJS.Timeout

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
    clearTimeout(NotificationItem._timeout)
    this.dispatchComponentWillUnmount()
  }

  render(): string {
    NotificationItem._timeout = setTimeout(this.hide.bind(this), 5000)

    return `
      <div class="${styles.notification} ${styles[this.getProps().type]}" >
        <div class="${styles.loader}"></div>
        <span>{{message}}</span>
      </div>
     `
  }
}
