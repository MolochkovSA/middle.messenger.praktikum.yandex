import Handlebars from 'handlebars'

import { ErrorPage, ErrorPageProps } from '../template/errorPage.tmpl'

export const NotFoundPage = () => {
  const code: number = 404
  const description: string = 'Страница не найдена'

  return Handlebars.compile<ErrorPageProps>(ErrorPage)({ code, description })
}
