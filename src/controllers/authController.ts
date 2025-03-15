import { authApi } from '@/api/authApi'
import { RoutePath } from '@/config/routeConfig'
import { Router } from '@/core'
import { APIError } from '@/errors'
import { NotificationService } from '@/services'
import { dispatch } from '@/store'
import { authActions } from '@/store/auth'

export async function login({ formData }: { formData: FormData }): Promise<void> {
  dispatch(authActions.setLoading(true))

  try {
    await authApi.signIn({
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    })

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
