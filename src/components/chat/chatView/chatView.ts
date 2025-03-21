import { Block } from '@/core'
import { Button, ChatMenuButton, InputField, MessagesFeed, MessagesFeedWithState } from '@/components'
import { FormControlService } from '@/services'
import { Chat } from '@/types/chat'
import { chatController } from '@/controllers'

import styles from './chatView.module.scss'

export type ChatViewProps = {
  chat?: Chat
}

type ChatViewChildren = {
  ChatMenuButton: ChatMenuButton
  AddAttachmentButton: Button
  MessageInput: InputField
  SendMessageButton: Button
  MessagesFeed: MessagesFeed
}

export class ChatView extends Block<ChatViewProps, {}, ChatViewChildren> {
  private formControlService: FormControlService

  constructor({ chat }: ChatViewProps = {}) {
    const formValidationService = new FormControlService()

    super({
      props: {
        chat,
      },
      children: {
        ChatMenuButton: new ChatMenuButton(),
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
        MessagesFeed: new MessagesFeedWithState(),
      },
    })

    this.formControlService = formValidationService
  }

  componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
  }

  componentDidUpdate(): void {
    const chatId = this.getProps().chat?.id

    if (chatId) {
      chatController.getChatUsers(chatId)
    }
  }

  render(): string {
    return `
      <div class=${styles.chatView}>
        {{#if chat}}
          <header class=${styles.header}>
            <img src="{{chat.avatar}}" class=${styles.avatar} alt="avatar">
            <h2>{{chat.title}}</h2>      
            {{{ ChatMenuButton }}}
          </header>

          
            {{{ MessagesFeed }}}
          

          <footer>
            <form class=${styles.form}>
              {{{ AddAttachmentButton }}}
              {{{ MessageInput }}}
              {{{ SendMessageButton }}}
            </form>
          </footer>
        {{else}}
          <h2 class=${styles.emptyChat}>Выберите чат чтобы отправить сообщение</h2>
        {{/if}}
      </div>
    `
  }
}
