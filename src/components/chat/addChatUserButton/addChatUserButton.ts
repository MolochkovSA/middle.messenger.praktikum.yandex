import { Block } from '@/core'
import { Button, Modal } from '@/components'
import circlePlusIcon from '@/assets/circlePlus.svg'

import styles from './addChatUserButton.module.scss'
import { AddChatUserModelContent } from './addChatUserModalContent'

type AddChatUserProps = {
  isShowModal?: boolean
  onClose: (e: Event) => void
}

type AddChatUserEvents = {
  click: (e: Event) => void
}

type AddChatUserChildren = {
  Button: Button
  Modal: Modal
}

export class AddChatUserButton extends Block<AddChatUserProps, AddChatUserEvents, AddChatUserChildren> {
  constructor({ isShowModal, onClose }: AddChatUserProps) {
    super({
      props: {
        isShowModal,
        onClose,
      },
      events: {
        click: () => {
          this.setProps({ isShowModal: true })
        },
      },
      children: {
        Button: new Button({
          label: addUserButtonLabel,
          className: styles.button,
        }),
        Modal: new Modal({
          children: new AddChatUserModelContent({
            onClose: (e) => {
              this.getProps().onClose(e)
              this.setProps({ isShowModal: false })
            },
          }),
          onClose: (e) => {
            this.getProps().onClose(e)
            this.setProps({ isShowModal: false })
          },
        }),
      },
    })
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

const addUserButtonLabel = `
    <img src=${circlePlusIcon} alt="addUserIcon">
    <p>Добавить пользователя</p>   
  `
