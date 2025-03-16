import { RoutePath } from '@/config/routeConfig'
import { Router } from '@/core'
import { getState } from '@/store'

export async function userGuard(): Promise<void> {
  const user = getState().user.user

  if (!user) {
    Router.navigate(RoutePath.LOGIN)
  }
}
