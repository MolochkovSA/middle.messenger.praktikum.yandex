import Handlebars from 'handlebars'

import { AuthLayout } from './auth'
import { ProfileLayout } from './profile'

Handlebars.registerPartial('AuthLayout', AuthLayout)
Handlebars.registerPartial('ProfileLayout', ProfileLayout)
