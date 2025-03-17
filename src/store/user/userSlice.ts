import { setObjectValues } from '@/utils'
import { Slice } from '../types'
import { User } from '@/types'

enum ActionType {
  SET_USER = 'SET_USER',
}

type UserState = {
  user: User | null
}

const initialState: UserState = { user: null }

export const userSlice: Slice<UserState> = {
  initialState,
  reducer: (state, action) => {
    switch (action.type) {
      case ActionType.SET_USER: {
        return setObjectValues(state, { user: action.payload?.user })
      }
      default: {
        return state
      }
    }
  },
}

export const userActions = {
  setUser: (user: User) => ({ type: ActionType.SET_USER, payload: { user } }),
  clearUser: () => ({ type: ActionType.SET_USER, payload: { user: null } }),
}
