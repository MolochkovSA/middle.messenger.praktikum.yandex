import { Loader } from '@/components'
import { RouteProps } from '@/core'
import {
  NotFoundPage,
  ServerErrorPage,
  RegisterPage,
  ChatPage,
  LoginPage,
  ProfileInfoPage,
  ProfileEditPage,
  ProfilePasswordPage,
  NavigationPage,
  chatLoader,
} from '@/pages'
import { authBlockGuard, authGuard } from '@/services'

export enum RoutePath {
  NAVIGATION = '/',
  LOGIN = '/sign-in',
  REGISTER = '/sign-up',
  CHAT = '/messenger',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  RESET_PASSWORD = '/reset-password',
  SERVER_ERROR = '/server-error',
  NOT_FOUND = '*',
}

export const routeConfig: RouteProps[] = [
  { pathname: RoutePath.NAVIGATION, block: NavigationPage },
  { pathname: RoutePath.LOGIN, block: LoginPage, loader: authBlockGuard },
  { pathname: RoutePath.REGISTER, block: RegisterPage, loader: authBlockGuard },
  { pathname: RoutePath.CHAT, block: ChatPage, loader: chatLoader, hydrateFallbackElement: Loader },
  { pathname: RoutePath.PROFILE, block: ProfileInfoPage, loader: authGuard, hydrateFallbackElement: Loader },
  { pathname: RoutePath.SETTINGS, block: ProfileEditPage },
  { pathname: RoutePath.RESET_PASSWORD, block: ProfilePasswordPage },
  { pathname: RoutePath.SERVER_ERROR, block: ServerErrorPage },
  { pathname: RoutePath.NOT_FOUND, block: NotFoundPage },
]
