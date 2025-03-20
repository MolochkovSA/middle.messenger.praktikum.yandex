import { Block } from '@/core'
import { AuthInputField, Button } from '@/components'
import { FormControlService } from '@/services'
import { chatController, userController } from '@/controllers'
import { getState } from '@/store'

import styles from './addChatUserModalContent.module.scss'

type AddChatUserModelContentProps = {
  isApiError: boolean
}

type AddChatUserModelContentChildren = {
  Input: AuthInputField
  SubmitButton: Button
}

const title = 'Добавить пользователя'
const titleError = 'Ошибка, попробуйте ещё раз'

export class AddChatUserModelContent extends Block<AddChatUserModelContentProps, {}, AddChatUserModelContentChildren> {
  private formControlService: FormControlService
  private onClose: (e: Event) => void

  constructor({ onClose }: { onClose: (e: Event) => void }) {
    const formValidationService = new FormControlService()

    super({
      props: {
        isApiError: false,
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
    this.setProps({ isApiError: false })

    const login = formData.get('login')!.toString()

    userController
      .searchUsersByLogin(login)
      .then((candidates) => {
        const user = candidates.find((candidate) => candidate.login === login)

        if (!user) throw new Error('Пользователь не найден')

        const { chats, activeChatId } = getState().chat
        const currentChat = chats.find((chat) => chat.id === activeChatId)

        if (!currentChat) throw new Error('Чат не найден')

        return chatController.addUsersToChat({ chatId: currentChat.id, users: [user.id] })
      })
      .then(() => this.onClose(e))
      .catch(() => this.setProps({ isApiError: true }))
  }

  render(): string {
    const { isApiError } = this.getProps()
    console.log(this.getChildren())

    return `     
          <form class=${styles.content}>
            <h2 {{#if isApiError}}class=${styles.error}{{/if}}>${isApiError ? titleError : title}</h2>
            {{{ Input }}}
            {{{ SubmitButton }}}
          </form>  
        `
  }
}
