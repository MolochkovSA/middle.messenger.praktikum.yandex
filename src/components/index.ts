import Handlebars from 'handlebars'

import { Button } from './button/'
import { Link } from './link/'
import { Input } from './input/'
import { Label } from './label/'
import { ErrorMessage } from './errorMessage/'

Handlebars.registerPartial('Button', Button)
Handlebars.registerPartial('Link', Link)
Handlebars.registerPartial('Input', Input)
Handlebars.registerPartial('Label', Label)
Handlebars.registerPartial('ErrorMessage', ErrorMessage)
