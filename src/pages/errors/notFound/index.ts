import Handlebars from 'handlebars'

import { errorPage, ErrorPageProps } from '../template/errorPage.tmpl'

export const NotFoundPage = () => {
  const code: number = 404
  const description: string = 'Страница не найдена'

  return Handlebars.compile<ErrorPageProps>(errorPage)({ code, description })
}
