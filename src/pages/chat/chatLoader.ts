import { authGuard } from '@/services'

export async function chatLoader() {
  authGuard()
}
