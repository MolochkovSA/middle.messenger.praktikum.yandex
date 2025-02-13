import { NotFoundPage, ServerErrorPage, AuthPage, ChatPage } from './pages'

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
  [AppRoutes.LOGIN]: AuthPage({
    title: 'Вход',
    button: { id: 'authButton', text: 'Авторизоваться' },
    link: { id: 'registerLink', text: 'Нет аккаунта?' },
    fields: [
      { id: 'authLogin', name: 'login', type: 'text', label: 'Логин', errorMessage: 'Неверный логин', value: 'John' },
      { id: 'authPassword', name: 'password', type: 'password', label: 'Пароль' },
    ],
  }),
  [AppRoutes.REGISTER]: AuthPage({
    title: 'Регистрация',
    button: { id: 'registerButton', text: 'Зарегистрироваться' },
    link: { id: 'authLink', text: 'Войти' },
    fields: [
      { id: 'registerEmail', name: 'email', type: 'email', label: 'Почта', value: 'pochta@yandex.ru' },
      { id: 'registerLogin', name: 'login', type: 'text', label: 'Логин', value: 'John' },
      { id: 'registerFirstName', name: 'first_name', type: 'text', label: 'Имя', value: 'John' },
      { id: 'registerSecondName', name: 'second_name', type: 'text', label: 'Фамилия', value: 'Smith' },
      { id: 'registerPhone', name: 'phone', type: 'tel', label: 'Телефон', value: '+7 (495) 123-45-67' },
      {
        id: 'registerPassword',
        name: 'password',
        type: 'password',
        label: 'Пароль',
        value: '123456',
        errorMessage: ' ',
      },
      {
        id: 'registerPasswordRepeat',
        name: 'password_repeat',
        type: 'password',
        label: 'Пароль (ещё раз)',
        value: '123457',
        errorMessage: 'Пароли не совпадают',
      },
    ],
  }),
  [AppRoutes.CHAT]: ChatPage({ title: 'Чат' }),
  // [AppRoutes.PROFILE]: Profile({ name: 'John', email: 'pochta@yandex.ru' }),
}
