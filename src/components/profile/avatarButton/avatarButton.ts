import { Block } from '@/core'
import { Button, Modal } from '@/components'
import { ChangeAvatarContent } from './changeAvatarContent'
import { getAvatarSrc } from '@/utils'

import styles from './avatarButton.module.scss'

type AvatarButtonProps = {
  avatar?: string
  disabled?: boolean
  isShowModal?: boolean
}

type AvatarButtonEvents = {
  click: (e: Event) => void
}

type AvatarButtonChildren = {
  Button: Button
  Modal: Modal<ChangeAvatarContent>
}

export class AvatarButton extends Block<AvatarButtonProps, AvatarButtonEvents, AvatarButtonChildren> {
  constructor({ avatar, disabled, isShowModal }: AvatarButtonProps = {}) {
    super({
      props: {
        avatar,
        disabled,
        isShowModal,
      },
      events: {
        click: () => {
          this.setProps({ isShowModal: true })
        },
      },
      children: {
        Button: new Button({
          label: '',
          className: styles.button,
          disabled,
        }),
        Modal: new Modal<ChangeAvatarContent>({
          children: new ChangeAvatarContent({
            onClose: () => this.closeModal(),
          }),
          onClose: () => this.closeModal(),
        }),
      },
    })
  }

  closeModal() {
    this.getChildren().Modal.getChildren().Content.resetState()
    this.setProps({ isShowModal: false })
  }

  render(): string {
    const { avatar, disabled } = this.getProps()
    const { Button } = this.getChildren()

    Button.setProps({
      label: getButtonLabel(avatar, disabled),
    })

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

const getButtonLabel = (avatar?: string, disabled?: boolean) => {
  const avatarSrc = getAvatarSrc(avatar || null)

  return `
  <img src="${avatarSrc}" class="${styles.avatar}" alt="avatar">
  ${disabled ? '' : `<div class="${styles.mask}"><span>Поменять аватар</span></div>`}
`
}
