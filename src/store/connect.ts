import { Block } from '@/core'
import { Indexed } from '@/types'
import { getState, subscribe } from './store'
import { areObjectsEqual } from '@/utils'

type State = ReturnType<typeof getState>

export function connect<P extends Indexed>(mapStateToProps: (state: State) => DeepPartial<P>) {
  return function (Component: new (props: P) => Block) {
    return class extends Component {
      private onChangeStoreCallback: () => void

      constructor(props: P = {} as P) {
        let state = mapStateToProps(getState())

        super({ ...props, ...state })

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(getState())

          if (!areObjectsEqual(state, newState)) {
            this.setProps({ ...newState })
          }

          state = newState
        }

        subscribe(this.onChangeStoreCallback)
      }

      // componentWillUnmount() {
      //   super.componentWillUnmount()
      //   store.off(StoreEvents.UPDATE, this.onChangeStoreCallback)
      // }
    }
  }
}
