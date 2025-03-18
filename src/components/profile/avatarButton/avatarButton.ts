import defaultAvatar from '@/assets/avatar.png'
import { Block } from '@/core'
import { Button, Modal } from '@/components'
import { ChangeAvatarContent } from '../changeAvatarContent'

import styles from './avatarButton.module.scss'

type AvatarButtonProps = {
  avatar: string
  isShowModal: boolean
}

type AvatarButtonEvents = {
  click: (e: Event) => void
}

type AvatarButtonChildren = {
  Button: Button
  Modal: Modal
}

export class AvataButton extends Block<AvatarButtonProps, AvatarButtonEvents, AvatarButtonChildren> {
  constructor({ disabled }: { disabled?: boolean } = {}) {
    super({
      props: {
        avatar: defaultAvatar,
        isShowModal: true,
      },
      events: {
        click: () => {
          this.setProps({ isShowModal: true })
        },
      },
      children: {
        Button: new Button({
          label: getButtonLabel(defaultAvatar, disabled),
          className: styles.button,
          disabled,
        }),
        Modal: new Modal({
          children: new ChangeAvatarContent({
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

const getButtonLabel = (avatarSrc: string, disabled?: boolean) => `
  <img src=${avatarSrc} class=${styles.avatar} alt="avatar">
  ${disabled ? '' : `<div class=${styles.mask}><span>Поменять аватар</span></div>`}
`
