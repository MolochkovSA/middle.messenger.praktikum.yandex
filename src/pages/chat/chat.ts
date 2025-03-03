import { Block } from '@/core'
import { ContactChat, Navbar } from '@/components'

import { mockContact, mockContactsList } from './mockData'
import { Contact } from './types'

import styles from './chat.module.scss'

type ChatProps = {
  selectedContact?: Contact
  isChatMenuOpen: boolean
}

type ChatChildren = {
  Navbar: Navbar
  ContactChat: ContactChat
}

export class ChatPage extends Block<ChatProps, {}, ChatChildren> {
  constructor() {
    super({
      props: {
        selectedContact: mockContact,
        isChatMenuOpen: false,
      },
      children: {
        Navbar: new Navbar(mockContactsList, (id: string) => {
          console.log(id)
        }),
        ContactChat: new ContactChat({ contact: mockContact }),
      },
    })
  }

  render() {
    return `
      <main class=${styles.chatPage}>
        {{{ Navbar }}}

        <div class=${styles.content}>
          {{#if selectedContact}}
            {{{ ContactChat }}}
          {{else}}
            <h2 class=${styles.emptyChat}>Выберите чат чтобы отправить сообщение</h2>
          {{/if}}
        </div>
      </main>
    `
  }
}
