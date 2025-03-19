import { userApi } from '@/api'
import { APIError } from '@/models'
import { logger, NotificationService } from '@/services'
import { dispatch } from '@/store'
import { userActions } from '@/store/user'
import { ResetPasswordDto, User, UserUpdateDTO } from '@/types/user'

const service = 'userController.'

export async function updateUser(data: UserUpdateDTO): Promise<void> {
  const context = service + updateUser.name

  logger.debug(context, 'start')
  dispatch(userActions.setLoading(true))

  try {
    const user = await userApi.updatetUser(data)
    dispatch(userActions.setUser(user))
    NotificationService.notify('Данные успешно обновлены', 'success')
    logger.debug(context, 'successful')
  } catch (error) {
    if (APIError.isAPIError(error)) {
      NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  } finally {
    dispatch(userActions.setLoading(false))
  }
}

export async function changeAvatar(data: FormData): Promise<void> {
  const context = service + changeAvatar.name

  logger.debug(context, 'start')
  const user = await userApi.changeAvatar(data)
  dispatch(userActions.setUser(user))
  NotificationService.notify('Аватар успешно обновлен', 'success')
  logger.debug(context, 'successful')
}

export async function resetPassword(data: ResetPasswordDto): Promise<void> {
  const context = service + resetPassword.name

  logger.debug(context, 'start')
  dispatch(userActions.setLoading(true))

  try {
    await userApi.resetPassword(data)
    NotificationService.notify('Пароль успешно изменен', 'success')
    logger.debug(context, 'successful')
  } catch (error) {
    if (APIError.isAPIError(error)) {
      NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
  } finally {
    dispatch(userActions.setLoading(false))
  }
}

export async function searchUsersByLogin(login: string): Promise<User[]> {
  const context = service + searchUsersByLogin.name

  logger.debug(context, 'start')

  try {
    const users = await userApi.searchUsersByLogin(login)
    logger.debug(context, 'successful')
    return users
  } catch (error) {
    if (APIError.isAPIError(error)) {
      NotificationService.notify(error.reason, 'error')
    }

    logger.error(context, error)
    return []
  }
}
