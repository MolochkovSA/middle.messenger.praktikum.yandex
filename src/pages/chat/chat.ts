import { Block, Router } from '@/core'
import { AddChatButton, ContactChat, Input, Link, ChatList } from '@/components'
import { Chat, ChatId } from '@/types/chat'
import { UserId } from '@/types/user'

import { mockContact } from './mockData'

import styles from './chat.module.scss'
import { MappedChatItem } from './types'

type ChatProps = {
  userId?: UserId
  chats: Chat[]
  searchValue: string
  activeChatId?: ChatId
  isChatMenuOpen: boolean
}

type ChatChildren = {
  ProfileLink: Link
  SearchInput: Input
  AddChatButton: AddChatButton
  ChatList: ChatList
  ContactChat: ContactChat
}

export class ChatPage extends Block<ChatProps, {}, ChatChildren> {
  constructor() {
    super({
      props: {
        userId: undefined,
        chats: [],
        searchValue: '',
        activeChatId: undefined,
        isChatMenuOpen: false,
      },
      children: {
        ProfileLink: new Link({ to: '/profile', label: 'Профиль' }),
        SearchInput: new Input({
          id: 'searchInput',
          type: 'text',
          name: 'search',
          placeholder: 'Поиск',
          blur: (e) => {
            this.setProps({
              searchValue: (e.target as HTMLInputElement).value,
            })
          },
        }),
        AddChatButton: new AddChatButton(),
        ChatList: new ChatList({
          chats: [],
          setActiveChatId: (activeChatId: ChatId) => this.setProps({ activeChatId }),
        }),
        ContactChat: new ContactChat({ contact: mockContact }),
      },
    })
  }

  protected componentDidMount(): void {
    const chats = Router.getLoaderData<Chat[]>()

    this.setProps({ chats })
  }

  render() {
    const { userId, chats, searchValue, activeChatId } = this.getProps()

    const filteredChats = chats.filter((chat) => chat.title.toLowerCase().includes(searchValue.toLowerCase()))
    console.log(filteredChats)

    const mappedChatItems: MappedChatItem[] = filteredChats.map<MappedChatItem>((chat) => {
      const lastMessageUserId = chat.last_message?.user.id
      const isMyMessage = !!lastMessageUserId && !!userId && lastMessageUserId === userId

      return {
        id: chat.id,
        title: chat.title,
        avatar: chat.avatar,
        isActive: chat.id === activeChatId,
        unread_count: chat.unread_count,
        isMyMessage,
        messageText: chat.last_message?.content || '',
        messageDate: chat.last_message?.time || '',
      }
    })

    console.log(mappedChatItems)

    this.getChildren().ChatList.setProps({ chats: mappedChatItems })

    return `
      <main class=${styles.chatPage}>
        <sidebar class=${styles.sidebar}>
          <div class=${styles.sidebarTop}>
            {{{ ProfileLink }}}

            <div class=${styles.searchInput}>
              {{{ SearchInput }}}  
              <span></span> 
            </div>

            {{{ AddChatButton }}}
          </div>

          {{{ ChatList }}}
        </sidebar>

        <div class=${styles.content}>
          {{#if selectedContactId}}
            {{{ ContactChat }}}
          {{else}}
            <h2 class=${styles.emptyChat}>Выберите чат чтобы отправить сообщение</h2>
          {{/if}}
        </div>
      </main>
    `
  }
}
