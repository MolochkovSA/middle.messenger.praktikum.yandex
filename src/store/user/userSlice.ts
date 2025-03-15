import { mergeObjects } from '@/utils'
import { Slice } from '../types'

type UserState = {
  id: number
  first_name: string
  second_name: string
  display_name?: string
  phone: string
  login: string
  avatar?: string
  email: string
}

const initialState: UserState = {
  id: 0,
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
  login: '',
  avatar: '',
  email: '',
}

const setLoadingAction = (isLoading: boolean) => ({ type: 'SET_LOADING', payload: { isLoading } })

export const userSlice: Slice<UserState> = {
  initialState,
  reducer: (state, action) => {
    switch (action.type) {
      default: {
        return state
      }
    }
  },
}
