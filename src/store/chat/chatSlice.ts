import { setObjectValues } from '@/utils'
import { Slice } from '../types'
import { Chat } from '@/types/chat'

enum ActionType {
  SET_CHATS = 'CHAT_SET_CHATS',
  SET_LOADING = 'CHAT_SET_LOADING',
}

type ChatState = {
  chats: Chat[]
  isLoading: boolean
}

const initialState: ChatState = {
  chats: [],
  isLoading: false,
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
}
