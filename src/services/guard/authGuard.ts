import { RoutePath } from '@/config/routeConfig'
import { authController } from '@/controllers'
import { logger } from '@/services'
import { Router } from '@/core'
import { User } from '@/types/user'

export async function authGuard(): Promise<User> {
  const context = authGuard.name
  const user = await authController.me()

  if (!user) {
    logger.info(context, 'failed')
    Router.navigate(RoutePath.LOGIN)
    throw new Error('User is not authorized')
  }

  logger.info(context, 'ok')
  return user
}
