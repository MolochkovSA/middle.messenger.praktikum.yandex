import { Block } from '@/core'
import { Link, Input, ContactListItem } from '@/components'
import { ContactItem } from '@/pages/chat'

import styles from './navbar.module.scss'

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
    return `
      <nav class=${styles.navbar}>
        <div class=${styles.topbar}>
          {{{ ProfileLink }}}

          <div class=${styles.searchInput}>
            {{{ SearchInput }}}  
            <span></span> 
          </div>
        </div>

        <ul>
          {{#each ContactList as |contact|}}
            <li>{{{ contact }}}<li/>
          {{else}}
            <p class=${styles.empty}>No contacts</p>
          {{/each}}
        </ul>
      </nav>
    `
  }
}
