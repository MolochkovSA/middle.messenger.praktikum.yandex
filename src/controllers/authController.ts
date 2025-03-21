import { authApi } from '@/api'
import { RoutePath } from '@/config/routeConfig'
import { Router } from '@/core'
import { APIError } from '@/models'
import { logger, NotificationService } from '@/services'
import { dispatch, getState } from '@/store'
import { authActions } from '@/store/auth'
import { chatActions } from '@/store/chat'
import { userActions } from '@/store/user'
import { SignInDto, SignUpDto, User } from '@/types/user'

const service = 'AuthController.'

export async function register(data: SignUpDto): Promise<void> {
  const context = service + register.name

  logger.debug(context, 'start')
  dispatch(authActions.setLoading(true))

  try {
    await authApi.signUp(data)
    NotificationService.notify('Регистрация прошла успешно', 'success')
    Router.navigate(RoutePath.CHAT)
    logger.debug(context, 'successful')
  } catch (error) {
    if (APIError.isAPIError(error)) {
      return NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  } finally {
    dispatch(authActions.setLoading(false))
  }
}

export async function login(data: SignInDto): Promise<void> {
  const context = service + login.name

  logger.debug(context, 'start')
  dispatch(authActions.setLoading(true))

  try {
    await authApi.signIn(data)
    logger.debug(context, 'successful')
    Router.navigate(RoutePath.CHAT)
  } catch (error) {
    if (APIError.isAPIError(error)) {
      return NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  } finally {
    dispatch(authActions.setLoading(false))
  }
}

export async function me(): Promise<User | null> {
  const context = service + me.name

  logger.debug(context, 'start')
  const localUser = getState().user.user

  if (localUser) {
    logger.debug(context, 'return local user')
    return localUser
  }

  try {
    const fetchedUser = await authApi.me()
    dispatch(userActions.setUser(fetchedUser))
    logger.debug(context, 'return fetched user')
    return fetchedUser
  } catch (error) {
    logger.debug(context, 'return null')
    return localUser
  }
}

export async function logout(): Promise<void> {
  const context = service + logout.name

  logger.debug(context, 'start')

  try {
    dispatch(userActions.clearUser())
    dispatch(chatActions.clearChats())
    dispatch(chatActions.clearChatUsers())
    await authApi.logout()
    Router.navigate(RoutePath.LOGIN)
    logger.debug(context, 'successful')
  } catch (error) {
    if (APIError.isAPIError(error)) {
      return NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  }
}
