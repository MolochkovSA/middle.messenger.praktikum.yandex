import Handlebars from 'handlebars'
import '@/helpers/chat'

import { Chat, ChatProps } from './chat.tmpl'
import { mockContact, mockContactsList } from './mockData'

export const ChatPage = () => {
  const state: ChatProps = {
    contactsList: mockContactsList,
    selectedContact: mockContact,
    isChatMenuOpen: true,
  }

  return Handlebars.compile<ChatProps>(Chat)(state)
}
