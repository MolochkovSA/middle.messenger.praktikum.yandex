export type Contact = {
  id: string
  name: string
  avatar?: string
  messagesGroup: { date: string; messages: Message[] }[]
}

export enum MessageType {
  Incoming,
  Outgoing,
}

export enum OutgoingMessageStatus {
  Sent,
  Delivered,
  Read,
}

export type Message = {
  id: string
  text: string
  date: string
} & (
  | {
      type: MessageType.Incoming
      read: boolean
    }
  | {
      type: MessageType.Outgoing
      status: OutgoingMessageStatus
    }
)

export type ContactItem = Pick<Contact, 'id' | 'name' | 'avatar'> & {
  lastMessage: Pick<Message, 'type' | 'text'> & {
    date: string
  }
} & { newMessageCount?: number }
