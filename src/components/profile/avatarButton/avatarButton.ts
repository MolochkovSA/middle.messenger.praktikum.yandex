import defaultAvatar from '@/assets/avatar.png'
import { Block } from '@/core'
import { Button, Modal } from '@/components'
import { ChangeAvatarContent } from './changeAvatarContent'
import { BASE_URL } from '@/config/constants'

import styles from './avatarButton.module.scss'

type AvatarButtonProps = {
  avatar?: string
  disabled?: boolean
  isShowModal: boolean
}

type AvatarButtonEvents = {
  click: (e: Event) => void
}

type AvatarButtonChildren = {
  Button: Button
  Modal: Modal
}

export class AvatarButton extends Block<AvatarButtonProps, AvatarButtonEvents, AvatarButtonChildren> {
  constructor({ disabled }: Pick<AvatarButtonProps, 'disabled' | 'avatar'> = {}) {
    super({
      props: {
        isShowModal: false,
        disabled,
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

const getButtonLabel = (avatarSrc?: string, disabled?: boolean) => {
  let avatarPath: string

  if (avatarSrc) {
    avatarPath = BASE_URL + '/resources' + avatarSrc
  } else {
    avatarPath = defaultAvatar
  }

  return `
  <img src=${avatarPath} class=${styles.avatar} alt="avatar">
  ${disabled ? '' : `<div class=${styles.mask}><span>Поменять аватар</span></div>`}
`
}
