export type Contact = {
  id: string
  name: string
  messages: Message[]
}

export enum MessageType {
  Incoming = 'incoming',
  Outgoing = 'outgoing',
}

export type Message = {
  id: string
  text: string
  date: number
} & (
  | {
      messageType: MessageType.Incoming
      viewed: boolean
    }
  | {
      messageType: MessageType.Outgoing
    }
)
