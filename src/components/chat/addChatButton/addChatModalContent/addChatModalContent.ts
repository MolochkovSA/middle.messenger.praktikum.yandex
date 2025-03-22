import { Block } from '@/core'
import { AuthInputField, Button } from '@/components'
import { FormControlService } from '@/services'
import { chatController } from '@/controllers'

import styles from './addChatModalContent.module.scss'

type AddChatModelContentProps = {
  apiError?: string
  onClose: (e: Event) => void
}

type AddChatModelContentChildren = {
  Input: AuthInputField
  SubmitButton: Button
}

export class AddChatModelContent extends Block<AddChatModelContentProps, {}, AddChatModelContentChildren> {
  private formControlService: FormControlService

  constructor({ apiError, onClose }: AddChatModelContentProps) {
    const formValidationService = new FormControlService()

    super({
      props: {
        apiError,
        onClose,
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
  }

  componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
    this.formControlService.attachSubmitHandler(this.handleSubmit.bind(this))
  }

  componentWillUpdate(): void {
    this.formControlService.removeEvents()
  }

  componentDidUpdate(): void {
    this.formControlService.getElements(this.getContent())
    this.formControlService.addEvents()
  }

  componentWillUnmount(): void {
    this.formControlService.removeEvents()
    this.formControlService.unmount()
  }

  async handleSubmit(e: Event, formData: FormData): Promise<void> {
    e.preventDefault()

    try {
      const chatTitle = formData.get('title')!.toString()

      await chatController.createChat({ title: chatTitle })

      this.getProps().onClose(e)
    } catch (error) {
      this.setProps({ apiError: (error as Error).message })
    }
  }

  clearError(): void {
    this.formControlService.clearForm()
    this.setProps({ apiError: undefined })
  }

  render(): string {
    const { apiError } = this.getProps()

    return `     
          <form class="${styles.content}">
            <h2 {{#if isApiError}}class="${styles.error}"{{/if}}>${getTitle(apiError)}</h2>
            {{{ Input }}}
            {{{ SubmitButton }}}
          </form>  
        `
  }
}

const getTitle = (errorMsg?: string) => (errorMsg ? `Ошибка: ${errorMsg}, попробуйте ещё раз` : 'Создать чат')
