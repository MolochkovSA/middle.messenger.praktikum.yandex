import { RoutePath } from '@/config/routeConfig'
import { authController } from '@/controllers'
import { Router } from '@/core'

export async function authBlockGuard(): Promise<void> {
  const user = await authController.me()

  if (user) {
    Router.navigate(RoutePath.CHAT)
    throw new Error('User is already authorized')
  }
}
