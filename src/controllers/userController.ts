import { userApi } from '@/api'
import { APIError } from '@/models'
import { logger, NotificationService } from '@/services'
import { dispatch } from '@/store'
import { userActions } from '@/store/user'
import { ResetPasswordDto, UserUpdateDTO } from '@/types/user'

const service = 'userController.'

export async function userUpdate(data: UserUpdateDTO): Promise<void> {
  const context = service + userUpdate.name

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
