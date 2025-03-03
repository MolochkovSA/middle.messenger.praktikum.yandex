import defaultAvatar from '@/assets/avatar.png'

import { Block } from '@/core'
import { Button } from '@/components'

import styles from './avatarButton.module.scss'

type AvatarButtonProps = {
  avatar: string
}

type AvatarButtonChildren = {
  Button: Button
}

export class AvataButton extends Block<AvatarButtonProps, {}, AvatarButtonChildren> {
  constructor({ disabled }: { disabled?: boolean } = {}) {
    super({
      props: {
        avatar: defaultAvatar,
      },
      children: {
        Button: new Button({
          label: getButtonLabel(defaultAvatar, disabled),
          className: styles.button,
          disabled,
        }),
      },
    })
  }

  render(): string {
    return `{{{ Button }}}`
  }
}

const getButtonLabel = (avatarSrc: string, disabled?: boolean) => `
  <img src=${avatarSrc} class=${styles.avatar} alt="avatar">
  ${disabled ? '' : `<div class=${styles.mask}><span>Поменять аватар</span></div>`}
`
