import { Block } from '@/core'
import { Button, InputField } from '@/components'
import { FormControlService } from '@/services'

import styles from './chatViewBottomBar.module.scss'
import { messageController } from '@/controllers'

type ChatViewBottomBarChildren = {
  AddAttachmentButton: Button
  MessageInput: InputField
  SendMessageButton: Button
}

export class ChatViewBottomBar extends Block<{}, {}, ChatViewBottomBarChildren> {
  private formControlService: FormControlService

  constructor() {
    const formValidationService = new FormControlService()

    super({
      children: {
        AddAttachmentButton: new Button({
          label: '',
          className: `${styles.button} ${styles.addAttachmentBtn}`,
        }),
        SendMessageButton: new Button({
          label: '',
          type: 'submit',
          className: `${styles.button} ${styles.sendMessageBtn}`,
        }),
        MessageInput: new InputField({
          type: 'text',
          name: 'message',
          placeholder: 'Сообщение',
          className: styles.meassageInput,
          errorListener: formValidationService.validate('message'),
        }),
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

    const message = formData.get('message')!.toString()
    messageController.sendMessage(message)
  }

  render(): string {
    return `
      <form class="${styles.form}">
        {{{ AddAttachmentButton }}}
        {{{ MessageInput }}}
        {{{ SendMessageButton }}}
      </form>
    `
  }
}
