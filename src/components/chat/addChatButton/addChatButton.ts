import { Block } from '@/core'
import { Button, Modal } from '@/components'
import { AddChatModelContent } from './addChatModalContent'

import styles from './addChatButton.module.scss'

type AddChatButtonProps = {
  isShowModal?: boolean
}

type AddChatButtonEvents = {
  click: (e: Event) => void
}

type AddChatButtonChildren = {
  Button: Button
  Modal: Modal<AddChatModelContent>
}

export class AddChatButton extends Block<AddChatButtonProps, AddChatButtonEvents, AddChatButtonChildren> {
  constructor({ isShowModal }: AddChatButtonProps = {}) {
    super({
      props: {
        isShowModal,
      },
      events: {
        click: () => {
          this.setProps({ isShowModal: true })
        },
      },
      children: {
        Button: new Button({
          label: 'Создать чат',
          className: styles.button,
        }),
        Modal: new Modal<AddChatModelContent>({
          children: new AddChatModelContent({
            onClose: () => this.closeModal(),
          }),
          onClose: () => this.closeModal(),
        }),
      },
    })
  }

  closeModal() {
    this.getChildren().Modal.getChildren().Content.clearError()
    this.setProps({ isShowModal: false })
  }

  render(): string {
    return `
      <div>
        {{{ Button }}}

        {{#if isShowModal}}
          {{{ Modal }}}
        {{/if}}
      </div>
    `
  }
}
