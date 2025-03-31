import defaultAvatar from '../assets/avatar.png'
import { BASE_HTTP_URL } from '../config/constants'

export function getAvatarSrc(avatar: string | null) {
  return avatar ? BASE_HTTP_URL + '/resources' + avatar : defaultAvatar
}
