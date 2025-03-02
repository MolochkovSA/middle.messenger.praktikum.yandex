import { Block } from '@/core'
import { Contact } from '@/pages/chat'

export type ContactChatProps = {
  contact: Contact
  isChatMenuOpen?: boolean
}

export class ContactChat extends Block {}
