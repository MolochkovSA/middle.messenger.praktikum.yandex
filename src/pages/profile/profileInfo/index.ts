import Handlebars from 'handlebars'

import { ProfileInfo, ProfileInfoProps } from './profileInfo.tmpl'

export const ProfileInfoPage = () => {
  const state: ProfileInfoProps = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: 'Иван',
    phone: '+7(909)967-30-30',
  }

  return Handlebars.compile<ProfileInfoProps>(ProfileInfo)(state)
}
