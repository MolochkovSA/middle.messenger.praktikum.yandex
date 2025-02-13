import Handlebars from 'handlebars'

import { Button } from './common/button'
import { Link } from './common/link'
import { Input } from './common/input'
import { AuthInput } from './auth/authInput'
import { Label } from './common/label'
import { ErrorMessage } from './common/errorMessage'

Handlebars.registerPartial('Button', Button)
Handlebars.registerPartial('Link', Link)
Handlebars.registerPartial('Input', Input)
Handlebars.registerPartial('AuthInput', AuthInput)
Handlebars.registerPartial('Label', Label)
Handlebars.registerPartial('ErrorMessage', ErrorMessage)
