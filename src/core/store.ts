import { mergeObjects } from '@/utils'
import { EventBus } from './event-bus'
import { Indexed } from '@/types'

export enum StoreEvents {
  UPDATE = 'update',
}

export class Store<S extends Indexed> extends EventBus {
  private _state: S = {} as S

  constructor(defaultState: S) {
    super()

    this._state = defaultState
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
