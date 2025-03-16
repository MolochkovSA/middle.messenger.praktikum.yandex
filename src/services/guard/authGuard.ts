import { RoutePath } from '@/config/routeConfig'
import { authController } from '@/controllers'
import { Router } from '@/core'

export async function authGuard(): Promise<void> {
  const user = await authController.me()

  if (!user) {
    Router.navigate(RoutePath.LOGIN)
    throw new Error('User is not authorized')
  }
}
