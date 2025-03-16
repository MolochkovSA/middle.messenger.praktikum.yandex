import { authApi } from '@/api'
import { RoutePath } from '@/config/routeConfig'
import { Router } from '@/core'
import { APIError } from '@/errors'
import { NotificationService } from '@/services'
import { dispatch } from '@/store'
import { authActions } from '@/store/auth'
import { userActions } from '@/store/user'

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

    const user = await authApi.me()

    dispatch(userActions.setUser(user))

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

    const user = await authApi.me()

    dispatch(userActions.setUser(user))

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
