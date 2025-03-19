import { Block } from '@/core'
import { Button, Modal } from '@/components'

import styles from './addChatButton.module.scss'
import { AddChatModelContent } from './addChatModalContent'

type AddChatButtonProps = {
  isShowModal: boolean
  disabled: boolean
}

type AddChatButtonEvents = {
  click: (e: Event) => void
}

type AddChatButtonChildren = {
  Button: Button
  Modal: Modal
}

export class AddChatButton extends Block<AddChatButtonProps, AddChatButtonEvents, AddChatButtonChildren> {
  constructor() {
    super({
      props: {
        isShowModal: false,
        disabled: false,
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
        Modal: new Modal({
          children: new AddChatModelContent({
            onClose: () => {
              this.setProps({ isShowModal: false })
            },
          }),
          onClose: () => {
            this.setProps({ isShowModal: false })
          },
        }),
      },
    })
  }

  render(): string {
    const { disabled } = this.getProps()
    const { Button } = this.getChildren()

    Button.setProps({ disabled })

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
