import { authApi } from '@/api'
import { RoutePath } from '@/config/routeConfig'
import { Router } from '@/core'
import { APIError } from '@/models'
import { logger, NotificationService } from '@/services'
import { dispatch, getState } from '@/store'
import { authActions } from '@/store/auth'
import { userActions } from '@/store/user'
import { User } from '@/types/user'

const service = 'authController.'

export async function register({ formData }: { formData: FormData }): Promise<void> {
  const context = service + register.name
  dispatch(authActions.setLoading(true))

  try {
    await authApi.signUp({
      email: formData.get('email') as string,
      login: formData.get('login') as string,
      first_name: formData.get('first_name') as string,
      second_name: formData.get('second_name') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
    })

    await me()

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

export async function login({ formData }: { formData: FormData }): Promise<void> {
  const context = service + login.name
  dispatch(authActions.setLoading(true))

  try {
    await authApi.signIn({
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    })

    await me()

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
  logger.debug(context, 'logout start')

  try {
    dispatch(userActions.clearUser())
    await authApi.logout()
    Router.navigate(RoutePath.LOGIN)
    logger.debug(context, 'logout end')
  } catch (error) {
    if (APIError.isAPIError(error)) {
      return NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  }
}
