import { Chat } from '@/types/chat'

export type MappedChatItem = Pick<Chat, 'id' | 'title' | 'avatar' | 'unread_count'> & {
  isActive: boolean
  messageText: string
  messageDate: string
  isMyMessage: boolean
}

// Delete

// export type Contact = {
//   id: string
//   name: string
//   avatar?: string
//   messagesGroup: { date: string; messages: Message[] }[]
// }

// export enum MessageType {
//   Incoming,
//   Outgoing,
// }

// export enum OutgoingMessageStatus {
//   Sent,
//   Delivered,
//   Read,
// }

// export type Message = {
//   id: string
//   text?: string
//   image?: string
//   date: string
// } & (
//   | {
//       type: MessageType.Incoming
//       read: boolean
//     }
//   | {
//       type: MessageType.Outgoing
//       status: OutgoingMessageStatus
//     }
// )

// export type ContactItem = Pick<Contact, 'id' | 'name' | 'avatar'> & {
//   lastMessage: Pick<Message, 'type' | 'text' | 'image'> & {
//     date: string
//   }
// } & { newMessageCount?: number }
