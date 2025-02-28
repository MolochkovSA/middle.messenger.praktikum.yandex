import Handlebars from 'handlebars'

// Common
export { Button } from './common/button'
export { Link } from './common/link'
export { Input } from './common/input'
export { InputField } from './common/inputField'

// Auth
export { AuthInputField } from './auth/authInputField'

// Profile
export { ProfileInputField } from './profile/profileInputField'
export { BackLink } from './profile/backLink'
export { AvataButton } from './profile/avatarButton'

// Chat
import { ContactListItem, ContactItemProps } from './chat/contactItem'
import { SearchInput, SearchInputProps } from './chat/searchInput'
import { ContactChat, ContactChatProps } from './chat/contactChat'
import { MessagesGroup, MessagesGroupProps } from './chat/messagesGroup'
import { Message } from './chat/message'

Handlebars.registerPartial('ContactListItem', ContactListItem)
Handlebars.registerPartial('SearchInput', SearchInput)
Handlebars.registerPartial('ContactChat', ContactChat)
Handlebars.registerPartial('MessagesGroup', MessagesGroup)
Handlebars.registerPartial('Message', Message)

export type { ContactItemProps, SearchInputProps, ContactChatProps, MessagesGroupProps }
