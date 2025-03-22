import { Block } from '@/core'
import { AuthInputField, Button } from '@/components'
import { FormControlService } from '@/services'
import { chatController, userController } from '@/controllers'
import { getState } from '@/store'

import styles from './addChatUserModalContent.module.scss'

type AddChatUserModelContentProps = {
  apiError?: string
  onClose: (e: Event) => void
}

type AddChatUserModelContentChildren = {
  Input: AuthInputField
  SubmitButton: Button
}

export class AddChatUserModelContent extends Block<AddChatUserModelContentProps, {}, AddChatUserModelContentChildren> {
  private formControlService: FormControlService

  constructor({ apiError, onClose }: AddChatUserModelContentProps) {
    const formValidationService = new FormControlService()

    super({
      props: {
        apiError,
        onClose,
      },
      children: {
        Input: new AuthInputField({
          type: 'text',
          name: 'login',
          label: 'Логин',
          placeholder: 'Введите логин',
          className: styles.input,
          errorListener: formValidationService.validate('login'),
        }),
        SubmitButton: new Button({ label: 'Добавить', type: 'submit' }),
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
      const login = formData.get('login')!.toString()
      const candidates = await userController.searchUsersByLogin(login)
      const user = candidates.find((candidate) => candidate.login === login)

      if (!user) throw new Error('пользователь не найден')

      const { chats, activeChatId } = getState().chat
      const currentChat = chats.find((chat) => chat.id === activeChatId)

      if (!currentChat) throw new Error('чат не найден')

      await chatController.addUsersToChat({ chatId: currentChat.id, users: [user.id] })

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
            <h2 {{#if apiError}}class="${styles.error}"{{/if}}>${getTitle(apiError)}</h2>
            {{{ Input }}}
            {{{ SubmitButton }}}
          </form>  
        `
  }
}

const getTitle = (errorMsg?: string) => (errorMsg ? `Ошибка: ${errorMsg}, попробуйте ещё раз` : 'Добавить пользователя')
