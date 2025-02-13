import { NotFoundPage, ServerErrorPage, RegisterPage, ChatPage, LoginPage } from './pages'

export enum AppRoutes {
  LOGIN = '/login',
  REGISTER = '/register',
  NOTFOUND = '/not-found',
  SERVERERROR = '/server-error',
  CHAT = '/chat',
  // PROFILE = 'profile',
}

export const router: Record<AppRoutes, string> = {
  [AppRoutes.NOTFOUND]: NotFoundPage(),
  [AppRoutes.SERVERERROR]: ServerErrorPage(),
  [AppRoutes.LOGIN]: LoginPage(),
  [AppRoutes.REGISTER]: RegisterPage(),
  [AppRoutes.CHAT]: ChatPage({ title: 'Чат' }),
  // [AppRoutes.PROFILE]: Profile({ name: 'John', email: 'pochta@yandex.ru' }),
}
