import {
  NotFoundPage,
  ServerErrorPage,
  RegisterPage,
  ChatPage,
  LoginPage,
  ProfileInfoPage,
  ProfileEditPage,
  ProfilePasswordPage,
} from './pages'

export enum AppRoutes {
  LOGIN = '/login',
  REGISTER = '/register',
  NOTFOUND = '/not-found',
  SERVERERROR = '/server-error',
  CHAT = '/chat',
  PROFILE = '/profile',
  PROFILE_EDIT = '/profile/edit',
  PROFILE_PASSWORD = '/profile/password',
}

export const router: Record<AppRoutes, string> = {
  [AppRoutes.NOTFOUND]: NotFoundPage(),
  [AppRoutes.SERVERERROR]: ServerErrorPage(),
  [AppRoutes.LOGIN]: LoginPage(),
  [AppRoutes.REGISTER]: RegisterPage(),
  [AppRoutes.CHAT]: ChatPage(),
  [AppRoutes.PROFILE]: ProfileInfoPage(),
  [AppRoutes.PROFILE_EDIT]: ProfileEditPage(),
  [AppRoutes.PROFILE_PASSWORD]: ProfilePasswordPage(),
}
