import { Block } from '@/core'
import { ContactItem } from '@/pages/chat'

import { contactListItemTemplate } from './contactListItem.tmpl'

export type ContactListItemProps = { contact: ContactItem; isActive: boolean }

type ContactListItemEvents = {
  click: (e: Event) => void
}

export class ContactListItem extends Block<ContactListItemProps, ContactListItemEvents> {
  constructor({ contact, isActive, click }: ContactListItemProps & { click: (id: string) => void }) {
    super({
      props: { contact, isActive },
      events: {
        click: () => click(contact.id),
      },
    })
  }

  render(): string {
    return contactListItemTemplate
  }
}
