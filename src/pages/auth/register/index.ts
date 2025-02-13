import Handlebars from 'handlebars'

import { Register, RegisterProps } from './register.tmpl'

export const RegisterPage = () => {
  const state: RegisterProps = {
    email: { value: 'pochta@yandex.ru' },
    login: { value: 'ivanivanov' },
    first_name: { value: 'Иван' },
    second_name: { value: 'Иванов' },
    phone: { value: '+7(909)967-30-30' },
    password: { value: '1234567', isError: true },
    password_repeat: { value: '1234568', isError: true, errorMessage: 'Пароли не совпадают' },
  }

  return Handlebars.compile<RegisterProps>(Register)(state)
}
