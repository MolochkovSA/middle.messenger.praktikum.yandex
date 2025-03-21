import { Block } from '@/core'
import { Button, ChatMenuButton, InputField } from '@/components'
import { FormControlService, NotificationService } from '@/services'
import { Chat, ChatId } from '@/types/chat'
import { chatController, messageController } from '@/controllers'

import styles from './chatView.module.scss'
import { getState } from '@/store'

export type ChatViewProps = {
  chat?: Chat
}

type ChatViewChildren = {
  ChatMenuButton: ChatMenuButton
  AddAttachmentButton: Button
  MessageInput: InputField
  SendMessageButton: Button
  // MessagesGroup: MessagesGroup[]
}

export class ChatView extends Block<ChatViewProps, {}, ChatViewChildren> {
  private formControlService: FormControlService

  constructor({ chat }: { chat?: Chat } = {}) {
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
        // MessagesGroup: props.contact.messagesGroup.map(
        //   (group) => new MessagesGroup({ date: group.date, messages: group.messages })
        // ),
      },
    })

    this.formControlService = formValidationService
  }

  componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
    this.getChatUsers()
  }

  protected componentDidUpdate(): void {
    this.getChatUsers()
    this.loadMessageHistory()
  }

  getChatUsers(): void {
    const chatId = this.getProps().chat?.id

    if (chatId) {
      chatController.getChatUsers(chatId)
    }
  }

  async loadMessageHistory(): Promise<void> {
    try {
      const chatId = this.getProps().chat?.id

      if (!chatId) throw new Error('Chat id not found')

      const userId = getState().user.user?.id

      if (!userId) throw new Error('User id not found')

      const token = await this.getChatToken(chatId)

      await messageController.connect({ userId, chatId, token })

      messageController.loadOldMessages()
    } catch (error) {
      NotificationService.notify((error as Error).message, 'error')
    }
  }

  async getChatToken(chatId: ChatId): Promise<string> {
    return await chatController.getChatToken(chatId)
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

          <main class=${styles.messages}>
            {{#each MessagesGroup as |group|}}
              {{{ group }}}
            {{/each}}
          </main>

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

      <div class=${styles.chat}>

      </div>
    `
  }
}
