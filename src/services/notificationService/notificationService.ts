import { NotificationItem } from './notificationItem/notificationItem'
import { NotificationType } from './types'

export class NotificationService {
  private static _container: HTMLElement
  private static _block?: NotificationItem

  static init({ container }: { container: HTMLElement }) {
    NotificationService._container = container
  }

  static notify(message: string, type: NotificationType) {
    NotificationService._block?.hide()
    NotificationService._block = new NotificationItem({ message, type })
    NotificationService._block.setProps({ message, type })
    NotificationService._block.dispatchComponentDidMount()
    NotificationService._container.after(NotificationService._block.getContent())
  }
}
