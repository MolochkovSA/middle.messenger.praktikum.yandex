import { Block } from '@/core'
import { Button, ChatMenu } from '@/components'
import { ChatMenuWithState } from '../chatMenu/chatMenu'

import styles from './chatMenuButton.module.scss'

type ChatMenuButtonProps = {
  isShowMenu: boolean
}

type ChatMenuButtonEvents = {
  click: (e: Event) => void
}

type ChatMenuButtonChildren = {
  Button: Button
  ChatMenu: ChatMenu
}

export class ChatMenuButton extends Block<ChatMenuButtonProps, ChatMenuButtonEvents, ChatMenuButtonChildren> {
  constructor() {
    super({
      props: {
        isShowMenu: false,
      },
      events: {
        click: () => {
          this.setProps({ isShowMenu: !this.getProps().isShowMenu })
        },
      },
      children: {
        Button: new Button({
          label: '<div></div>',
          className: styles.button,
        }),
        ChatMenu: new ChatMenuWithState({
          chatUsers: [],
          onClose: () => {
            this.setProps({ isShowMenu: false })
          },
        }),
      },
    })
  }

  render(): string {
    return `
      <div class="${styles.container}">
        {{{ Button }}}

        {{#if isShowMenu }}
          {{{ ChatMenu }}}
        {{/if}}
      </div>
    `
  }
}
