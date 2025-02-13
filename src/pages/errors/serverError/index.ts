import Handlebars from 'handlebars'

import { errorPage, ErrorPageProps } from '../template/errorPage.tmpl'

export const ServerErrorPage = () => {
  const code: number = 500
  const description: string = 'Мы уже фиксим'

  return Handlebars.compile<ErrorPageProps>(errorPage)({ code, description })
}
