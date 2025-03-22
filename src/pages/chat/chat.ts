import { Block, Router } from '@/core'
import { AddChatButton, ChatView, Input, Link, ChatList } from '@/components'
import { Chat, ChatId } from '@/types/chat'
import { MappedChatItem } from './types'
import { dispatch, getState } from '@/store'
import { chatActions } from '@/store/chat'
import { formatDate, getAvatarSrc } from '@/utils'
import { connect } from '@/store/connect'

import styles from './chat.module.scss'

type ChatProps = {
  userLogin?: string
  chats: Chat[]
  searchValue: string
  activeChatId?: ChatId
}

type ChatChildren = {
  ProfileLink: Link
  SearchInput: Input
  AddChatButton: AddChatButton
  ChatList: ChatList
  ChatView: ChatView
}

export class ChatPage extends Block<ChatProps, {}, ChatChildren> {
  constructor() {
    super({
      props: {
        userLogin: undefined,
        chats: [],
        searchValue: '',
        activeChatId: undefined,
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
          setActiveChatId: (activeChatId: ChatId) => {
            dispatch(chatActions.setActiveChatId(activeChatId))
            this.setProps({ activeChatId })
          },
        }),
        ChatView: new ChatView(),
      },
    })
  }

  componentDidMount(): void {
    const chats = Router.getLoaderData<Chat[]>()
    const userLogin = getState().user.user?.login

    if (chats) this.setProps({ chats })
    this.setProps({ userLogin })
  }

  render() {
    const { userLogin, chats, searchValue, activeChatId } = this.getProps()
    const { ChatList, ChatView } = this.getChildren()

    const filteredChats = chats.filter((chat) => chat.title.toLowerCase().includes(searchValue.toLowerCase()))
    let aciveChat: Chat | undefined

    const mappedChatItems: MappedChatItem[] = filteredChats.map<MappedChatItem>((chat) => {
      const lastMessageUserLogin = chat.last_message?.user.login
      const isMyMessage = !!lastMessageUserLogin && !!userLogin && lastMessageUserLogin === userLogin
      const date = chat.last_message?.time ? formatDate(chat.last_message?.time) : ''
      const isActive = chat.id === activeChatId

      if (isActive) aciveChat = { ...chat, avatar: getAvatarSrc(chat.avatar) }

      return {
        id: chat.id,
        title: chat.title,
        avatar: getAvatarSrc(chat.avatar),
        isActive,
        unread_count: chat.unread_count,
        isMyMessage,
        messageText: chat.last_message?.content || '',
        messageDate: date,
      }
    })

    ChatList.setProps({ chats: mappedChatItems })
    ChatView.setProps({ chat: aciveChat })

    return `
      <main class="${styles.chatPage}">
        <sidebar class="${styles.sidebar}">
          <div class="${styles.sidebarTop}">
            {{{ ProfileLink }}}

            <div class="${styles.searchInput}">
              {{{ SearchInput }}}  
              <span></span> 
            </div>

            {{{ AddChatButton }}}
          </div>

          {{{ ChatList }}}
        </sidebar>

        {{{ ChatView }}}
      </main>
    `
  }
}

export const ChatPageWithState = connect<ChatProps, {}, ChatChildren>(({ chat }) => ({
  chats: chat.chats,
  activeChatId: chat.activeChatId,
}))(ChatPage)
