import { Block } from '@/core'

import styles from './modal.module.scss'

type ModalProps<C> = {
  children: C
  onClose: (e: Event) => void
}

type ModalEvents = {
  click: (e: Event) => void
}

export class Modal<C extends Block> extends Block<{}, ModalEvents, { Content: C }> {
  constructor({ onClose, children }: ModalProps<C>) {
    super({
      events: {
        click: (e) => {
          e.stopPropagation()
          if (e.target !== e.currentTarget) return
          onClose(e)
        },
      },
      children: {
        Content: children,
      },
    })
  }

  render(): string {
    return `
      <div class="${styles.overlay}">
        <div class="${styles.modal}">
          {{#if Content}}
            {{{ Content }}}
          {{/if}}
        </div>
      </div>
     `
  }
}
