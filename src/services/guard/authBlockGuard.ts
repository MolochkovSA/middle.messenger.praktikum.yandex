import { RoutePath } from '@/config/routeConfig'
import { authController } from '@/controllers'
import { Router } from '@/core'
import { logger } from '@/services'

export async function authBlockGuard(): Promise<void> {
  const context = authBlockGuard.name
  const user = await authController.me()

  if (user) {
    logger.info(context, 'failed')
    Router.navigate(RoutePath.CHAT)
    throw new Error('User is already authorized')
  }

  logger.info(context, 'ok')
}
