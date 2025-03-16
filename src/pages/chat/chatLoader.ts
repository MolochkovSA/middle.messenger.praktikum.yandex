import { userGuard } from '@/services'

export async function chatLoader() {
  userGuard()
}
