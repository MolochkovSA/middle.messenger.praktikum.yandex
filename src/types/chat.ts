export type ChatId = number

export type Chat = {
  id: ChatId
  title: string
}

export type NewChatDto = Pick<Chat, 'title'>
