import { Block } from '@/core'
import { ContactItem } from '@/pages/chat'

import { contactListItemTemplate } from './contactListItem.tmpl'

export type ContactListItemProps = { contact: ContactItem }

export class ContactListItem extends Block<ContactListItemProps> {
  constructor(contact: ContactItem) {
    super({ props: { contact } })
  }

  render(): string {
    return contactListItemTemplate
  }
}
