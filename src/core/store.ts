import { mergeObjects } from '@/utils'
import { EventBus } from './event-bus'
import { Indexed } from '@/types'

enum StoreEvents {
  UPDATE = 'update',
}

export class Store<S extends Indexed> extends EventBus {
  private _state: S = {} as S
  private _instance: Store<S> | null = null

  constructor(defaultState: S) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (this._instance) return this._instance

    super()

    this._state = defaultState
    this._instance = this
  }

  getState() {
    return structuredClone(this._state)
  }

  setState(partialState: DeepPartial<S>) {
    const prevState = this.getState()
    this._state = mergeObjects<S>(this._state, partialState)
    this.emit(StoreEvents.UPDATE, prevState, this._state)
  }
}
