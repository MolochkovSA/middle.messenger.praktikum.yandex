import defaultAvatar from '@/assets/avatar.png'
import { BASE_URL } from '@/config/constants'

export function getAvatarSrc(avatar: string | null) {
  return avatar ? BASE_URL + '/resources' + avatar : defaultAvatar
}
