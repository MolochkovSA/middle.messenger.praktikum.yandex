import Handlebars from 'handlebars'

import { SearchInput, SearchInputProps } from './searchInput/'
import { ContactItem, ContactItemProps } from './contactItem'
import { ContactChat } from './contactChat'

Handlebars.registerPartial('SearchInput', SearchInput)
Handlebars.registerPartial('ContactItem', ContactItem)
Handlebars.registerPartial('ContactChat', ContactChat)

export type { SearchInputProps, ContactItemProps }
