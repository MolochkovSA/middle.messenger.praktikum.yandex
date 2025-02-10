import Handlebars from 'handlebars'

import { Button, ButtonProps } from './button/'
import { Link, LinkProps } from './link/'
import { Input, InputProps } from './input/'
import { Label, LabelProps } from './label/'
import { ErrorMessage, ErrorMessageProps } from './errorMessage/'

Handlebars.registerPartial('Button', Button)
Handlebars.registerPartial('Link', Link)
Handlebars.registerPartial('Input', Input)
Handlebars.registerPartial('Label', Label)
Handlebars.registerPartial('ErrorMessage', ErrorMessage)

export type { ButtonProps, LinkProps, InputProps, LabelProps, ErrorMessageProps }
