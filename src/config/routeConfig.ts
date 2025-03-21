import { Loader } from '@/components'
import { RouteProps } from '@/core'
import {
  NotFoundPage,
  ServerErrorPage,
  RegisterPageWithState,
  ChatPageWithState,
  LoginPageWithState,
  ProfileInfoPageWithState,
  ProfileEditPageWithState,
  ProfilePasswordPageWithState,
  chatLoader,
} from '@/pages'
import { authBlockGuard, authGuard } from '@/services'

export enum RoutePath {
  LOGIN = '/sign-in',
  REGISTER = '/sign-up',
  CHAT = '/',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  RESET_PASSWORD = '/reset-password',
  SERVER_ERROR = '/server-error',
  NOT_FOUND = '*',
}

export const routeConfig: RouteProps[] = [
  { pathname: RoutePath.LOGIN, block: LoginPageWithState, loader: authBlockGuard },
  { pathname: RoutePath.REGISTER, block: RegisterPageWithState, loader: authBlockGuard },
  { pathname: RoutePath.CHAT, block: ChatPageWithState, loader: chatLoader, hydrateFallbackElement: Loader },
  { pathname: RoutePath.PROFILE, block: ProfileInfoPageWithState, loader: authGuard, hydrateFallbackElement: Loader },
  { pathname: RoutePath.SETTINGS, block: ProfileEditPageWithState, loader: authGuard, hydrateFallbackElement: Loader },
  {
    pathname: RoutePath.RESET_PASSWORD,
    block: ProfilePasswordPageWithState,
    loader: authGuard,
    hydrateFallbackElement: Loader,
  },
  { pathname: RoutePath.SERVER_ERROR, block: ServerErrorPage },
  { pathname: RoutePath.NOT_FOUND, block: NotFoundPage },
]
