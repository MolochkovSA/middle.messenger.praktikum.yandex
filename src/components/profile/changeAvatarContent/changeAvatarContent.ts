import { Button } from '@/components/common/button'
import { InputField } from '@/components/common/inputField'
import { Block } from '@/core'

import styles from './changeAvatarContent.module.scss'
import { userController } from '@/controllers'

type ChangeAvatarContentProps = {
  title: string
  isNoFileError: boolean
  isApiError: boolean
}

type ChangeAvatarContentEvents = {
  submit: (e: Event) => void
}

type ChangeAvatarContentChildren = {
  Input: InputField
  SubmitButton: Button
}

const titleNoFile = 'Загрузите файл'
const titleFile = 'Файл загружен'
const titleError = 'Ошибка, попробуйте ещё раз'
const labelNoFile = 'Выбрать файл на компьютере'

export class ChangeAvatarContent extends Block<
  ChangeAvatarContentProps,
  ChangeAvatarContentEvents,
  ChangeAvatarContentChildren
> {
  private onClose: (e: Event) => void

  constructor({ onClose }: { onClose: (e: Event) => void }) {
    super({
      props: {
        title: titleNoFile,
        isNoFileError: true,
        isApiError: false,
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
        SubmitButton: new Button({ label: 'Поменять', type: 'submit', className: styles.button }),
      },
    })

    this.onClose = onClose
  }

  uploadFile(e: Event) {
    this.resetError()
    const element = e.target as HTMLInputElement
    const fileName = element.files?.item(0)?.name

    if (fileName) {
      this.getChildren().Input.setProps({ label: fileName })
      this.setProps({ title: titleFile, isNoFileError: false })
    } else {
      this.getChildren().Input.setProps({ label: labelNoFile })
      this.setProps({ title: titleNoFile, isNoFileError: true })
    }
  }

  submit(e: Event) {
    e.preventDefault()

    if (this.getProps().isNoFileError) {
      return this.getChildren().Input.setProps({ errorMessage: 'Файл не выбран' })
    }

    const form = new FormData(this.getContent() as HTMLFormElement)
    userController
      .changeAvatar(form)
      .then(() => {
        this.resetState()
        this.onClose(e)
      })
      .catch(() => {
        this.setProps({ title: titleError, isApiError: true })
        this.getChildren().Input.setProps({ label: labelNoFile })
      })
  }

  resetError() {
    this.setProps({ title: titleNoFile, isNoFileError: false, isApiError: false })
    this.getChildren().Input.setProps({ errorMessage: undefined })
  }

  resetState() {
    this.resetError()
    this.getChildren().Input.setProps({ label: labelNoFile })
  }

  render(): string {
    return `     
      <form class=${styles.content}>
        <h2 {{#if isApiError}}class=${styles.error}{{/if}}>{{ title }}</h2>
        {{{ Input }}}
        {{{ SubmitButton }}}
      </form>  
    `
  }
}
