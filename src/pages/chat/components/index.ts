import Handlebars from 'handlebars'

import { SearchInput, SearchInputProps } from '../../../components/chat/searchInput'
import { ContactItem, ContactItemProps } from '../../../components/chat/contactItem'
import { ContactChat } from './contactChat'

Handlebars.registerPartial('SearchInput', SearchInput)
Handlebars.registerPartial('ContactItem', ContactItem)
Handlebars.registerPartial('ContactChat', ContactChat)

export type { SearchInputProps, ContactItemProps }
