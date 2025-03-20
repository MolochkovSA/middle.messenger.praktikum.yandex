import { Block } from '@/core'
import { Button, Modal } from '@/components'
import circlePlusIcon from '@/assets/circlePlus.svg'
import { AddChatUserModelContent } from './addChatUserModalContent'

import styles from './addChatUserButton.module.scss'

type AddChatUserProps = {
  isShowModal?: boolean
  onClose: (e: Event) => void
}

type AddChatUserEvents = {
  click: (e: Event) => void
}

type AddChatUserChildren = {
  Button: Button
  Modal: Modal<AddChatUserModelContent>
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
        Modal: new Modal<AddChatUserModelContent>({
          children: new AddChatUserModelContent({
            onClose: (e) => this.closeModal(e),
          }),
          onClose: (e) => this.closeModal(e),
        }),
      },
    })
  }

  closeModal(e: Event) {
    this.getChildren().Modal.getChildren().Content.clearError()
    this.getProps().onClose(e)
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

const addUserButtonLabel = `
    <img src=${circlePlusIcon} alt="addUserIcon">
    <p>Добавить пользователя</p>   
  `
