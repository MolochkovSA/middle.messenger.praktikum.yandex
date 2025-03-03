import { Block } from '@/core'
import { Contact } from '@/pages/chat'
import { Button, InputField } from '@/components'

import { contactChatTemplate } from './contactChat.tmpl'

import styles from './contactChat.module.scss'
import { MessagesGroup } from '../messagesGroup'

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
  constructor(props: ContactChatProps) {
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
          className: `${styles.button} ${styles.sendMessageBtn}`,
        }),
        MessageInput: new InputField({
          type: 'text',
          name: 'message',
          placeholder: 'Сообщение',
          className: styles.meassageInput,
        }),
        MessagesGroup: props.contact.messagesGroup.map(
          (group) => new MessagesGroup({ date: group.date, messages: group.messages })
        ),
      },
    })
  }

  render(): string {
    return contactChatTemplate
  }
}
