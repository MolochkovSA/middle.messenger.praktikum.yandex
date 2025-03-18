import { setObjectValues } from '@/utils'
import { Slice } from '../types'
import { User } from '@/types/user'

enum ActionType {
  SET_USER = 'SET_USER',
  SET_LOADING = 'SET_LOADING',
}

type UserState = {
  user: User | null
  isLoading: boolean
}

const initialState: UserState = { user: null, isLoading: false }

export const userSlice: Slice<UserState> = {
  initialState,
  reducer: (state, action) => {
    switch (action.type) {
      case ActionType.SET_USER: {
        return setObjectValues(state, { user: action.payload?.user })
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

export const userActions = {
  setUser: (user: User) => ({ type: ActionType.SET_USER, payload: { user } }),
  clearUser: () => ({ type: ActionType.SET_USER, payload: { user: null } }),
  setLoading: (isLoading: boolean) => ({ type: ActionType.SET_LOADING, payload: { isLoading } }),
}
