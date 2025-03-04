import { Block } from '@/core'
import { ContactChat, Navbar } from '@/components'

import { mockContact, mockContactsList } from './mockData'
import { Contact } from './types'

import styles from './chat.module.scss'

type ChatProps = {
  contacts: Contact[]
  selectedContactId?: string
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
        contacts: [],
        isChatMenuOpen: false,
      },
      children: {
        Navbar: new Navbar({
          contactList: mockContactsList,
          setActiveContactId: (id: string) => {
            this.setProps({ selectedContactId: id })
          },
        }),
        ContactChat: new ContactChat({ contact: mockContact }),
      },
    })
  }

  protected componentDidMount(): void {
    this.setProps({ contacts: [mockContact] })
  }

  render() {
    const { contacts, selectedContactId } = this.getProps()

    const selectedContact = contacts.find((contact) => contact.id === selectedContactId)

    if (selectedContact) {
      this.setChildren({ ContactChat: new ContactChat({ contact: selectedContact }) })
    }

    return `
      <main class=${styles.chatPage}>
        {{{ Navbar }}}

        <div class=${styles.content}>
          {{#if selectedContactId}}
            {{{ ContactChat }}}
          {{else}}
            <h2 class=${styles.emptyChat}>Выберите чат чтобы отправить сообщение</h2>
          {{/if}}
        </div>
      </main>
    `
  }
}
