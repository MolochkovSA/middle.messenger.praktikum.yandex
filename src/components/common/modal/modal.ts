import { Block } from '@/core'

import styles from './modal.module.scss'

type ModalProps = {
  children?: Block
  onClose: (e: Event) => void
}

type ModalEvents = {
  click: (e: Event) => void
}

export class Modal extends Block<{}, ModalEvents, {}> {
  constructor({ onClose, children }: ModalProps) {
    super({
      events: {
        click: (e) => {
          e.stopPropagation()
          if (e.target !== e.currentTarget) return
          onClose(e)
        },
      },
      children: { children },
    })
  }

  render(): string {
    return `
      <div class="${styles.overlay}">
        <div class="${styles.modal}" >
          {{{ children }}}
          {{{ ModalContent1 }}}
        </div>
      </div>
     `
  }
}
