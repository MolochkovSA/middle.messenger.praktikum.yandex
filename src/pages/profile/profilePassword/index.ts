import Handlebars from 'handlebars'

import { ProfilePassword, ProfilePasswordProps } from './profilePassword.tmpl'

export const ProfilePasswordPage = () => {
  const state: ProfilePasswordProps = {
    oldPassword: '123456',
    newPassword: '1234567',
    newPasswordRepeat: '1234567',
  }

  return Handlebars.compile<ProfilePasswordProps>(ProfilePassword)(state)
}
