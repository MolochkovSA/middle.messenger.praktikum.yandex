import { RoutePath } from '@/config/routeConfig'
import { authController } from '@/controllers'
import { logger } from '@/services'
import { Router } from '@/core'

export async function authGuard(): Promise<void> {
  const context = authGuard.name
  const user = await authController.me()

  logger.debug(context, JSON.stringify(user))

  if (!user) {
    Router.navigate(RoutePath.LOGIN)
    throw new Error('User is not authorized')
  }
}
