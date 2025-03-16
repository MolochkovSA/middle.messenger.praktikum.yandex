import { authApi } from '@/api'
import { RoutePath } from '@/config/routeConfig'
import { Router } from '@/core'
import { APIError } from '@/errors'
import { NotificationService } from '@/services'
import { dispatch, getState } from '@/store'
import { authActions } from '@/store/auth'
import { userActions } from '@/store/user'
import { User } from '@/types'

export async function register({ formData }: { formData: FormData }): Promise<void> {
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

    console.log(error)
  } finally {
    dispatch(authActions.setLoading(false))
  }
}

export async function login({ formData }: { formData: FormData }): Promise<void> {
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

    console.log(error)
  } finally {
    dispatch(authActions.setLoading(false))
  }
}

export async function me(): Promise<User | undefined> {
  const currentUser = getState().user.user

  if (currentUser) return currentUser

  try {
    const user = await authApi.me()
    dispatch(userActions.setUser(user))
    return user
  } catch (error) {
    return currentUser
  }
}

export async function logout(): Promise<void> {
  try {
    await authApi.logout()
    Router.navigate(RoutePath.LOGIN)
  } catch (error) {
    if (APIError.isAPIError(error)) {
      return NotificationService.notify(error.reason, 'error')
    }

    console.log(error)
  }
}
