import { Store, StoreEvents } from '@/core'
import { logger } from '@/services'
import { authSlice } from './auth'
import { userSlice } from './user'
import { chatSlice } from './chat'
import { Action } from './types'

const slices = {
  auth: authSlice,
  user: userSlice,
  chat: chatSlice,
}

type State = {
  [K in keyof typeof slices]: (typeof slices)[K] extends { initialState: infer R } ? R : never
}

function createStore() {
  const initialState: State = Object.fromEntries(
    Object.entries(slices).map(([key, slice]) => [key, slice.initialState])
  ) as State

  const store = new Store(initialState)

  return {
    getState: () => store.getState(),
    dispatch: (action: Action) => {
      const state = store.getState()
      store.setState(rootReducer(state, action))
    },
    subscribe: (callback: () => void) => store.on(StoreEvents.UPDATE, callback),
    unsubscribe: (callback: () => void) => store.off(StoreEvents.UPDATE, callback),
  }
}

function rootReducer(sate: State, action: Action): State {
  const nextState = Object.keys(sate).reduce<State>(
    (acc, key) => {
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[key] = slices[key].reducer(sate[key], action)

      return acc
    },
    { ...sate }
  )

  logger.info('reducer.action: ', action)
  logger.info('reducer.nextState: ', nextState)

  return nextState
}

export const { dispatch, getState, subscribe, unsubscribe } = createStore()
