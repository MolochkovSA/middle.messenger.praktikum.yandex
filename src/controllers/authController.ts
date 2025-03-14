import { authApi } from '@/api/authApi'
import { RoutePath } from '@/config/routeConfig'
import { Router } from '@/core'
import { APIError } from '@/errors'
import { NotificationService } from '@/services'

export async function login({ formData }: { formData: FormData }): Promise<void> {
  try {
    const result = await authApi.signIn({
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    })

    if (APIError.isAPIError(result)) {
      return NotificationService.notify(result.reason, 'error')
    }

    Router.navigate(RoutePath.CHAT)
  } catch (error) {
    console.log(error)
  }
}
