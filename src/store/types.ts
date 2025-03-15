import { Indexed } from '@/types'

export type Action<S extends Indexed = Indexed> = {
  type: string
  payload?: DeepPartial<S>
}

export type Reducer<S extends Indexed> = (state: S, action: Action<S>) => S

export type Slice<S extends Indexed> = {
  initialState: S
  reducer: Reducer<S>
}
