import { setObjectValues } from '@/utils'
import { Slice } from '../types'
import { Chat, ChatId, ChatUser } from '@/types/chat'

enum ActionType {
  SET_LOADING = 'CHAT_SET_LOADING',
  SET_CHATS = 'CHAT_SET_CHATS',
  SET_CHAT_USERS = 'CHAT_SET_CHAT_USERS',
  SET_ACTIVE_CHAT_ID = 'CHAT_SET_ACTIVE_CHAT_ID',
}

type ChatState = {
  isLoading: boolean
  chats: Chat[]
  chatUsers: ChatUser[]
  activeChatId?: ChatId
}

const initialState: ChatState = {
  isLoading: false,
  chats: [],
  chatUsers: [],
}

export const chatSlice: Slice<ChatState> = {
  initialState,
  reducer: (state, action) => {
    switch (action.type) {
      case ActionType.SET_CHATS: {
        return setObjectValues(state, { chats: action.payload?.chats })
      }
      case ActionType.SET_LOADING: {
        return setObjectValues(state, { isLoading: action.payload?.isLoading })
      }
      case ActionType.SET_CHAT_USERS: {
        return setObjectValues(state, { chatUsers: action.payload?.chatUsers })
      }
      case ActionType.SET_ACTIVE_CHAT_ID: {
        return setObjectValues(state, { activeChatId: action.payload?.activeChatId })
      }
      default: {
        return state
      }
    }
  },
}

export const chatActions = {
  setChats: (chats: Chat[]) => ({ type: ActionType.SET_CHATS, payload: { chats } }),
  clearChats: () => ({ type: ActionType.SET_CHATS, payload: { chats: [] } }),
  setLoading: (isLoading: boolean) => ({ type: ActionType.SET_LOADING, payload: { isLoading } }),
  setChatUsers: (chatUsers: ChatUser[]) => ({ type: ActionType.SET_CHAT_USERS, payload: { chatUsers } }),
  clearChatUsers: () => ({ type: ActionType.SET_CHAT_USERS, payload: { chatUsers: [] } }),
  setActiveChatId: (activeChatId: ChatId) => ({ type: ActionType.SET_ACTIVE_CHAT_ID, payload: { activeChatId } }),
}
