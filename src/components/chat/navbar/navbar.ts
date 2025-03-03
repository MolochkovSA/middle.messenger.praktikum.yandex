import { Block } from '@/core'
import { Link, Input, ContactListItem } from '@/components'
import { ContactItem } from '@/pages/chat'

import { navbarTemplate } from './navbar.tmpl'

type NavbarProps = {
  searchValue: string
  activeContactId?: string
}

type NavbarChildren = {
  ProfileLink: Link
  SearchInput: Input
  ContactList: ContactListItem[]
}

export class Navbar extends Block<NavbarProps, {}, NavbarChildren> {
  constructor(contactList: ContactItem[], setActiveContactId: (id: string) => void) {
    super({
      props: {
        searchValue: '',
      },
      children: {
        ProfileLink: new Link({ to: '/profile', label: 'Профиль' }),
        SearchInput: new Input({
          id: 'searchInput',
          type: 'text',
          name: 'search',
          placeholder: 'Поиск',
          blur: (e) => {
            this.setProps({
              searchValue: (e.target as HTMLInputElement).value,
            })
          },
        }),
        ContactList: contactList.map(
          (contact) =>
            new ContactListItem({
              contact,
              isActive: false,
              click: (id: string) => {
                this.setProps({ activeContactId: id })
                setActiveContactId(id)
              },
            })
        ),
      },
    })
  }

  render(): string {
    const { searchValue, activeContactId } = this.getProps()

    const filteredContacts = this.getChildren().ContactList.filter((ContactListItem) =>
      ContactListItem.getProps().contact.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    filteredContacts.forEach((contact) =>
      contact.setProps({ isActive: contact.getProps().contact.id === activeContactId })
    )

    this.setChildren({ ContactList: filteredContacts })

    return navbarTemplate
  }
}
