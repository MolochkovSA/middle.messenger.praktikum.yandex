import { RoutePath } from '@/config/routeConfig'
import { authController } from '@/controllers'
import { logger } from '@/services'
import { Router } from '@/core'
import { User } from '@/types'

export async function authGuard(): Promise<User> {
  const context = authGuard.name
  const user = await authController.me()

  logger.debug(context, user)

  if (!user) {
    Router.navigate(RoutePath.LOGIN)
    throw new Error('User is not authorized')
  }

  return user
}
