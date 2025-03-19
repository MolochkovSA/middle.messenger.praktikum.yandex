import { Block } from '@/core'
import { Button } from '@/components'
import circlePlusIcon from '@/assets/circlePlus.svg'

import styles from './chatMenu.module.scss'

type ChatMenuEvents = {
  click: (e: Event) => void
}

type ChatMenuChildren = {
  AddUserButton: Button
  RemoveUserButton: Button
}

export class ChatMenu extends Block<{}, ChatMenuEvents, ChatMenuChildren> {
  private onClose: (e: Event) => void

  constructor({ onClose }: { onClose: (e: Event) => void }) {
    super({
      events: {
        click: (e) => {
          //   e.stopPropagation()
          if (e.target !== e.currentTarget) return
          onClose(e)
        },
      },
      children: {
        AddUserButton: new Button({
          label: addUserButtonLabel,
          className: styles.chatMenuBtn,
          click: (e) => {
            this.onClose(e)
          },
        }),
        RemoveUserButton: new Button({
          label: removeUserButtonLabel,
          className: styles.chatMenuBtn,
          click: (e) => {
            this.onClose(e)
          },
        }),
      },
    })

    this.onClose = onClose
  }

  render(): string {
    return `
      <div class="${styles.overlay}">
        <div class="${styles.chatMenu}">
          {{{ AddUserButton }}}
          {{{ RemoveUserButton }}}
        </div>
      </div>
    `
  }
}

const addUserButtonLabel = `
    <img src=${circlePlusIcon} alt="circlePlusIcon">
    <p>Добавить пользователя</p>   
  `

const removeUserButtonLabel = `
    <img src=${circlePlusIcon} class=${styles.removeUserIcon} alt="circlePlusIcon">
    <p>Удалить пользователя</p>    
  `
