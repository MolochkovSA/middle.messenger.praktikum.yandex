import { authApi } from '@/api'
import { RoutePath } from '@/config/routeConfig'
import { Router } from '@/core'
import { APIError } from '@/errors'
import { logger, NotificationService } from '@/services'
import { dispatch, getState } from '@/store'
import { authActions } from '@/store/auth'
import { userActions } from '@/store/user'
import { User } from '@/types'

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

export async function me(): Promise<User | undefined> {
  const context = service + me.name
  const currentUser = getState().user.user

  if (currentUser) {
    logger.debug(context, 'return currentUser')
    return currentUser
  }

  try {
    const user = await authApi.me()
    logger.debug(context, 'dispatch and return user')
    dispatch(userActions.setUser(user))
    return user
  } catch (error) {
    logger.debug(context, 'return undefined')
    return currentUser
  }
}

export async function logout(): Promise<void> {
  const context = service + logout.name

  try {
    dispatch(userActions.clearUser())
    await authApi.logout()
    Router.navigate(RoutePath.LOGIN)
  } catch (error) {
    if (APIError.isAPIError(error)) {
      return NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  }
}
