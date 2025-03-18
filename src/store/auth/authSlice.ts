import { setObjectValues } from '@/utils'
import { Slice } from '../types'

enum ActionType {
  SET_LOADING = 'AUTH_SET_LOADING',
}

type AuthState = {
  isLoading: boolean
}

const initialState: AuthState = {
  isLoading: false,
}

export const authSlice: Slice<AuthState> = {
  initialState,
  reducer: (state, action) => {
    switch (action.type) {
      case ActionType.SET_LOADING: {
        return setObjectValues(state, { isLoading: action.payload?.isLoading })
      }
      default: {
        return state
      }
    }
  },
}

export const authActions = {
  setLoading: (isLoading: boolean) => ({ type: ActionType.SET_LOADING, payload: { isLoading } }),
}
