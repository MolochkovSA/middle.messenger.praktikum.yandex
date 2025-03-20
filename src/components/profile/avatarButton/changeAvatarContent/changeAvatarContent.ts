import { Button } from '@/components/common/button'
import { InputField } from '@/components/common/inputField'
import { Block } from '@/core'
import { userController } from '@/controllers'

import styles from './changeAvatarContent.module.scss'

type ChangeAvatarContentProps = {
  isFileExist?: boolean
  apiError?: string
  onClose: (e: Event) => void
}

type ChangeAvatarContentEvents = {
  submit: (e: Event) => void
}

type ChangeAvatarContentChildren = {
  Input: InputField
  SubmitButton: Button
}

const labelNoFile = 'Выбрать файл на компьютере'

export class ChangeAvatarContent extends Block<
  ChangeAvatarContentProps,
  ChangeAvatarContentEvents,
  ChangeAvatarContentChildren
> {
  constructor({ isFileExist, apiError, onClose }: ChangeAvatarContentProps) {
    super({
      props: {
        isFileExist,
        apiError,
        onClose,
      },
      events: {
        submit: (e: Event) => this.submit(e),
      },
      children: {
        Input: new InputField({
          name: 'avatar',
          type: 'file',
          className: styles.input,
          label: labelNoFile,
          change: (e: Event) => this.uploadFile(e),
        }),
        SubmitButton: new Button({ label: 'Поменять', type: 'submit' }),
      },
    })
  }

  uploadFile(e: Event): void {
    this.clearError()
    const element = e.target as HTMLInputElement
    const fileName = element.files?.item(0)?.name

    if (fileName) {
      this.getChildren().Input.setProps({ label: fileName })
      this.setProps({ isFileExist: true })
    } else {
      this.getChildren().Input.setProps({ label: labelNoFile })
    }
  }

  async submit(e: Event): Promise<void> {
    e.preventDefault()

    try {
      if (!this.getProps().isFileExist) {
        return this.getChildren().Input.setProps({ errorMessage: 'Файл не выбран' })
      }

      const form = new FormData(this.getContent() as HTMLFormElement)

      await userController.changeAvatar(form)

      this.resetState()
      this.getProps().onClose(e)
    } catch (error) {
      this.setProps({ apiError: (error as Error).message })
    }
  }

  resetState() {
    const { Input } = this.getChildren()
    const inputElement = Input.getContent() as HTMLInputElement

    this.clearError()

    Input.setProps({ label: labelNoFile })
    inputElement.files = null
  }

  clearError(): void {
    this.setProps({ isFileExist: undefined, apiError: undefined })
    this.getChildren().Input.setProps({ errorMessage: undefined })
  }

  render(): string {
    const { isFileExist, apiError } = this.getProps()

    return `     
      <form class=${styles.content}>
        <h2 {{#if apiError}}class=${styles.error}{{/if}}>${getTitle(isFileExist, apiError)}</h2>
        {{{ Input }}}
        {{{ SubmitButton }}}
      </form>  
    `
  }
}

const getTitle = (isFileExist?: boolean, apiError?: string) => {
  if (isFileExist && !apiError) return 'Файл загружен'

  return apiError ? `Ошибка: ${apiError}, попробуйте ещё раз` : 'Загрузите файл'
}
