import defaultAvatar from '@/assets/avatar.png'

import { Block } from '@/core'
import { Button } from '@/components'

import { avatarButtonTemplate, getButtonLabel } from './avatarButton.tmpl'

import styles from './avatarButton.module.scss'

type AvatarButtonProps = {
  avatar: string
}

type AvatarButtonChildren = {
  Button: Button
}

export class AvataButton extends Block<AvatarButtonProps, {}, AvatarButtonChildren> {
  constructor() {
    super({
      props: {
        avatar: defaultAvatar,
      },
      children: {
        Button: new Button({
          label: getButtonLabel(defaultAvatar),
          className: styles.button,
        }),
      },
    })
  }

  render(): string {
    return avatarButtonTemplate
  }
}
