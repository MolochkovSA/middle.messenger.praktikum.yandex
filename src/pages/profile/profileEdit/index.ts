import Handlebars from 'handlebars'

import { ProfileEdit, ProfileEditProps } from './profileEdit.tmpl'

export const ProfileEditPage = () => {
  const state: ProfileEditProps = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: 'Иван',
    phone: '+7(909)967-30-30',
  }

  return Handlebars.compile<ProfileEditProps>(ProfileEdit)(state)
}
