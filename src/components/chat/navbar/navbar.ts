import { Block } from '@/core'
import { Link, Input, ContactListItem } from '@/components'
import { ContactItem } from '@/pages/chat'

import { navbarTemplate } from './navbar.tmpl'

type NavbarChildren = {
  ProfileLink: Link
  SearchInput: Input
  ContactList: ContactListItem[]
}

export class Navbar extends Block<{}, {}, NavbarChildren> {
  constructor(contactList: ContactItem[]) {
    super({
      children: {
        ProfileLink: new Link({ to: '/profile', label: 'Профиль' }),
        SearchInput: new Input({
          id: 'searchInput',
          type: 'text',
          name: 'search',
          placeholder: 'Поиск',
          blur: (e) => {
            this.setChildren({
              ContactList: contactList
                .filter((contact) =>
                  contact.name.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase())
                )
                .map((contact) => new ContactListItem(contact)),
            })
          },
        }),
        ContactList: contactList.map((contact) => new ContactListItem(contact)),
      },
    })
  }

  render(): string {
    return navbarTemplate
  }
}
