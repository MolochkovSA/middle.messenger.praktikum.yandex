import { setObjectValues } from '@/utils'
import { Slice } from '../types'
import { Message } from '@/types/message'

enum ActionType {
  SET_MESSAGES = 'MESSAGE_SET_MESSAGES',
  ADD_MESSAGE = 'MESSAGE_ADD_MESSAGE',
}

type MessageState = {
  messages: Message[]
}

const initialState: MessageState = { messages: [] }

export const messageSlice: Slice<MessageState> = {
  initialState,
  reducer: (state, action) => {
    switch (action.type) {
      case ActionType.SET_MESSAGES: {
        return setObjectValues(state, { messages: action.payload?.messages })
      }
      case ActionType.ADD_MESSAGE: {
        return setObjectValues(state, { messages: [...state.messages, ...(action.payload?.messages ?? [])] })
      }
      default: {
        return state
      }
    }
  },
}

export const messageActions = {
  setMessages: (messages: Message[]) => ({ type: ActionType.SET_MESSAGES, payload: { messages } }),
  clearUser: () => ({ type: ActionType.SET_MESSAGES, payload: { messages: [] } }),
  addMessages: (messages: Message[]) => ({ type: ActionType.ADD_MESSAGE, payload: { messages } }),
}
