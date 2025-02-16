import Handlebars from 'handlebars'

import { Navigation } from './navigation.tmpl'

export const NavigationPage = () => {
  return Handlebars.compile(Navigation)({})
}
