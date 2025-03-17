import { Block } from '@/core'
import { Contact } from '@/pages/chat'
import { Button, InputField } from '@/components'
import { FormControlService } from '@/services'
import defaultAvatar from '@/assets/avatar.png'

import { MessagesGroup } from '../messagesGroup'

import styles from './contactChat.module.scss'

export type ContactChatProps = {
  contact: Contact
  isChatMenuOpen?: boolean
}

type ContactChatChildren = {
  ChatMenuButton: Button
  AddAttachmentButton: Button
  MessageInput: InputField
  SendMessageButton: Button
  MessagesGroup: MessagesGroup[]
}

export class ContactChat extends Block<ContactChatProps, {}, ContactChatChildren> {
  private formControlService: FormControlService

  constructor(props: ContactChatProps) {
    const formValidationService = new FormControlService()

    super({
      props,
      children: {
        ChatMenuButton: new Button({
          label: '<div></div>',
          click: () => {},
          className: styles.openChatMenuBtn,
        }),
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
        MessagesGroup: props.contact.messagesGroup.map(
          (group) => new MessagesGroup({ date: group.date, messages: group.messages })
        ),
      },
    })

    this.formControlService = formValidationService
  }

  componentDidMount(): void {
    this.formControlService.getElements(this.getContent())
  }

  render(): string {
    return `
      <div class=${styles.chat}>
        <header class=${styles.header}>
          <img 
            src="{{#if contact.avatar}} {{contact.avatar}} {{else}} ${defaultAvatar} {{/if}}"  
            class=${styles.avatar} 
            alt="avatar">
          <h2>{{contact.name}}</h2>      
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
      </div>
    `
  }
}
