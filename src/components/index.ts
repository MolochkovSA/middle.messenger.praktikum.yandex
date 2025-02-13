import Handlebars from 'handlebars'

import { Button, ButtonProps } from './common/button'
import { Link, LinkProps } from './common/link'
import { Input, InputProps } from './common/input'
import { AuthInput, AuthInputProps } from './auth/authInput'
import { ProfileInput, ProfileInputProps } from './profile/profileInput'
import { Label, LabelProps } from './common/label'
import { ErrorMessage, ErrorMessageProps } from './common/errorMessage'

Handlebars.registerPartial('Button', Button)
Handlebars.registerPartial('Link', Link)
Handlebars.registerPartial('Input', Input)
Handlebars.registerPartial('AuthInput', AuthInput)
Handlebars.registerPartial('ProfileInput', ProfileInput)
Handlebars.registerPartial('Label', Label)
Handlebars.registerPartial('ErrorMessage', ErrorMessage)

export type { ButtonProps, LinkProps, InputProps, AuthInputProps, LabelProps, ErrorMessageProps, ProfileInputProps }
