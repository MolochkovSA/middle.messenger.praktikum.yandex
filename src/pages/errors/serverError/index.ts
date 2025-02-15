import Handlebars from 'handlebars'

import { ErrorPage, ErrorPageProps } from '../template/errorPage.tmpl'

export const ServerErrorPage = () => {
  const code: number = 500
  const description: string = 'Мы уже фиксим'

  return Handlebars.compile<ErrorPageProps>(ErrorPage)({ code, description })
}
