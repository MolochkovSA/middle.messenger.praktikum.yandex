import { Block } from '@/core'
import { AuthInputField, Button } from '@/components'

import styles from './addChatModalContent.module.scss'
import { FormControlService } from '@/services'
import { chatController } from '@/controllers'

type AddChatModelContentProps = {
  title: string
  isApiError: boolean
}

type AddChatModelContentChildren = {
  Input: AuthInputField
  SubmitButton: Button
}

const title = 'Создать чат'
const titleError = 'Ошибка, попробуйте ещё раз'

export class AddChatModelContent extends Block<AddChatModelContentProps, {}, AddChatModelContentChildren> {
  private formControlService: FormControlService
  private onClose: (e: Event) => void

  constructor({ onClose }: { onClose: (e: Event) => void }) {
    const formValidationService = new FormControlService()

    super({
      props: {
        title,
        isApiError: false,
      },
      children: {
        Input: new AuthInputField({
          type: 'text',
          name: 'title',
          label: 'Название чата',
          placeholder: 'Название чата',
          className: styles.input,
          errorListener: formValidationService.validate('required'),
        }),
        SubmitButton: new Button({ label: 'Создать', type: 'submit' }),
      },
    })

    this.formControlService = formValidationService
    this.onClose = onClose
  }

  protected componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
    this.formControlService.attachSubmitHandler(this.handleSubmit.bind(this))
  }

  protected componentWillUpdate(): void {
    this.formControlService.removeEvents()
  }

  protected componentDidUpdate(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
  }

  protected componentWillUnmount(): void {
    this.formControlService.removeEvents()
    this.formControlService.unmount()
  }

  handleSubmit(e: Event, formData: FormData): void {
    e.preventDefault()
    this.setProps({ title, isApiError: false })

    const chatTitle = formData.get('title')!.toString()
    chatController
      .createChat({ title: chatTitle })
      .then(() => this.onClose(e))
      .catch(() => this.setProps({ title: titleError, isApiError: true }))
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
