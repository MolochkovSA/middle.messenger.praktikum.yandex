import Handlebars from 'handlebars'

// Common
export { Button } from './common/button'
export { Link } from './common/link'
export { Input } from './common/input'

// Auth
export { AuthInput } from './auth/authInput'

// Profile
import { ProfileInput, ProfileInputProps } from './profile/profileInput'

// Chat
import { ContactListItem, ContactItemProps } from './chat/contactItem'
import { SearchInput, SearchInputProps } from './chat/searchInput'
import { ContactChat, ContactChatProps } from './chat/contactChat'
import { MessagesGroup, MessagesGroupProps } from './chat/messagesGroup'
import { Message } from './chat/message'

Handlebars.registerPartial('ProfileInput', ProfileInput)
Handlebars.registerPartial('ContactListItem', ContactListItem)
Handlebars.registerPartial('SearchInput', SearchInput)
Handlebars.registerPartial('ContactChat', ContactChat)
Handlebars.registerPartial('MessagesGroup', MessagesGroup)
Handlebars.registerPartial('Message', Message)

export type { ProfileInputProps, ContactItemProps, SearchInputProps, ContactChatProps, MessagesGroupProps }
