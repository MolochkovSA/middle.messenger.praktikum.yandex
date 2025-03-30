import sinon from 'sinon'
import { expect } from 'chai'
import { Store, StoreEvents } from './store'

describe('Store', () => {
  let store: Store<{ count: number }>

  beforeEach(() => {
    store = new Store({ count: 0 })
  })

  afterEach(() => {
    store.clear()
  })

  it('should be created', () => {
    expect(store).to.be.instanceOf(Store)
  })

  it('should have a getState method', () => {
    expect(store.getState()).to.be.deep.equal({ count: 0 })
  })

  it('should have a setState method', () => {
    store.setState({ count: 1 })
    expect(store.getState()).to.be.deep.equal({ count: 1 })
  })

  it('should have a reactive behavior', () => {
    const spy = sinon.spy(store, 'emit')
    store.setState({ count: 1 })

    expect(spy.calledWith(StoreEvents.UPDATE)).to.be.equal(true)
  })

  it('should have a subscribe method', () => {
    store.on(StoreEvents.UPDATE, (prevState, newState) => {
      expect(prevState).to.be.deep.equal({ count: 0 })
      expect(newState).to.be.deep.equal({ count: 1 })
    })

    store.setState({ count: 1 })
  })
})
