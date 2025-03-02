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
export { Navbar } from './chat/navbar'
export { ContactListItem } from './chat/contactListItem'
import { ContactChat, ContactChatProps } from './chat/contactChat'
import { MessagesGroup, MessagesGroupProps } from './chat/messagesGroup'
import { Message } from './chat/message'

Handlebars.registerPartial('ContactChat', ContactChat)
Handlebars.registerPartial('MessagesGroup', MessagesGroup)
Handlebars.registerPartial('Message', Message)

export type { ContactChatProps, MessagesGroupProps }
