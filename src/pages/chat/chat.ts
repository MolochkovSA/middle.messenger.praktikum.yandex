import { Block } from '@/core'
import { Navbar } from '@/components'

import { chatPageTemplate } from './chat.tmpl'
import { Contact } from './types'
import { mockContactsList } from './mockData'

type ChatState = {
  selectedContact?: Contact
  isChatMenuOpen: boolean
}

type ChatProps = {
  state: ChatState
}

type ChatChildren = {
  Navbar: Navbar
}

export class ChatPage extends Block<ChatProps, {}, ChatChildren> {
  constructor() {
    super({
      props: {
        state: {
          isChatMenuOpen: false,
        },
      },
      children: {
        Navbar: new Navbar(mockContactsList),
      },
    })
  }
  render() {
    return chatPageTemplate
  }
}
