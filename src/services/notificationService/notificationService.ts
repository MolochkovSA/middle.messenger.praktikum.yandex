import { NotificationComponent } from './notification'
import { NotificationType } from './types'

export class NotificationService {
  private static _container: HTMLElement
  private static _block: NotificationComponent

  static init({ container }: { container: HTMLElement }) {
    NotificationService._container = container
    NotificationService._block = new NotificationComponent({ message: '', type: 'error' })
  }

  static notify(message: string, type: NotificationType) {
    NotificationService.hide()
    NotificationService._block.setProps({ message, type })
    NotificationService._block.dispatchComponentDidMount()
    NotificationService._container.after(NotificationService._block.getContent())
  }

  private static hide() {
    NotificationService._block.hide()
  }
}
