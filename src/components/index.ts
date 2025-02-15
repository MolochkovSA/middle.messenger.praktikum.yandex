import Handlebars from 'handlebars'

// Common
import { Button, ButtonProps } from './common/button'
import { Link, LinkProps } from './common/link'
import { Input, InputProps } from './common/input'
import { Label, LabelProps } from './common/label'
import { ErrorMessage, ErrorMessageProps } from './common/errorMessage'

// Auth
import { AuthInput, AuthInputProps } from './auth/authInput'

// Profile
import { ProfileInput, ProfileInputProps } from './profile/profileInput'

// Chat
import { ContactListItem, ContactItemProps } from './chat/contactItem'
import { SearchInput, SearchInputProps } from './chat/searchInput'
import { ContactChat, ContactChatProps } from './chat/contactChat'
import { MessagesGroup, MessagesGroupProps } from './chat/messagesGroup'
import { Message } from './chat/message'

Handlebars.registerPartial('Button', Button)
Handlebars.registerPartial('Link', Link)
Handlebars.registerPartial('Input', Input)
Handlebars.registerPartial('AuthInput', AuthInput)
Handlebars.registerPartial('ProfileInput', ProfileInput)
Handlebars.registerPartial('Label', Label)
Handlebars.registerPartial('ErrorMessage', ErrorMessage)
Handlebars.registerPartial('ContactListItem', ContactListItem)
Handlebars.registerPartial('SearchInput', SearchInput)
Handlebars.registerPartial('ContactChat', ContactChat)
Handlebars.registerPartial('MessagesGroup', MessagesGroup)
Handlebars.registerPartial('Message', Message)

export type {
  ButtonProps,
  LinkProps,
  InputProps,
  AuthInputProps,
  LabelProps,
  ErrorMessageProps,
  ProfileInputProps,
  ContactItemProps,
  SearchInputProps,
  ContactChatProps,
  MessagesGroupProps,
}
