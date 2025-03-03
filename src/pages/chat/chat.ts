import { Block } from '@/core'
import { ContactChat, Navbar } from '@/components'

import { chatPageTemplate } from './chat.tmpl'
import { mockContact, mockContactsList } from './mockData'
import { Contact } from './types'

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
    return chatPageTemplate
  }
}
