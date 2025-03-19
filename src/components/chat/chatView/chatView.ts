import { Block } from '@/core'
import { Button, ChatMenuButton, InputField } from '@/components'
import { FormControlService } from '@/services'
import defaultAvatar from '@/assets/avatar.png'
import { Chat } from '@/types/chat'

import styles from './chatView.module.scss'

export type ChatViewProps = {
  chat?: Chat
  isChatMenuOpen: boolean
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
        isChatMenuOpen: false,
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
  }

  render(): string {
    return `
      <div class=${styles.chatView}>
        {{#if chat}}
          <header class=${styles.header}>
            <img 
              src="{{#if contact.avatar}} {{contact.avatar}} {{else}} ${defaultAvatar} {{/if}}"  
              class=${styles.avatar} 
              alt="avatar">
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
