import { Store, StoreEvents } from '@/core'
import { authSlice } from './auth/authSlice'
import { userSlice } from './user/userSlice'
import { Action } from './types'

const slices = {
  auth: authSlice,
  user: userSlice,
}

const initialState = {
  auth: authSlice.initialState,
  user: userSlice.initialState,
}

type State = typeof initialState

const createStore = () => {
  const store = new Store(initialState)

  function reducer(sate: State, action: Action): State {
    const nextState = { ...sate }
    const keys = Object.keys(sate)

    keys.forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      nextState[key] = slices[key].reducer(store.getState()[key], action)
    })

    return nextState
  }

  return {
    getState: () => store.getState(),
    dispatch: (action: Action) => {
      const state = store.getState()
      store.setState(reducer(state, action))
    },
    subscribe: (callback: () => void) => store.on(StoreEvents.UPDATE, callback),
    unsubscribe: (callback: () => void) => store.off(StoreEvents.UPDATE, callback),
  }
}

export const { dispatch, getState, subscribe, unsubscribe } = createStore()
