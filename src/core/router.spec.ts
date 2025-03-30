import { createSandbox } from 'sinon'
import { Block } from './block'
import { Router } from './router'
import { expect } from 'chai'

describe('Router', () => {
  const sandbox = createSandbox()
  const container = document.createElement('div')

  class Login extends Block {
    render() {
      return '<span id="test-login">Login</span>'
    }
  }
  class Chat extends Block {
    render() {
      return '<span id="test-chat">Chat</span>'
    }
  }

  beforeEach(() => {
    Router.init({
      container,
      routeConfig: [
        { pathname: '/login', block: Login },
        { pathname: '/chat', block: Chat },
      ],
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should be initialized', () => {
    const spyInit = sandbox.spy(Router, 'init')

    Router.init({ container, routeConfig: [] })

    expect(spyInit.calledOnce).to.be.equal(true)
  })

  describe('Navigation', () => {
    it('should navigate to the login page', () => {
      Router.navigate('/login')

      expect('/login').to.be.eqls(window.location.pathname)
    })

    it('should render the login page', () => {
      Router.navigate('/login')

      const loginPage = container.querySelector('#test-login')

      expect(loginPage).to.not.equal(null)
    })

    it('should return a history depth of 2', () => {
      const spyPushState = sandbox.spy(window.history, 'pushState')

      Router.navigate('/login')
      Router.navigate('/chat')

      expect(spyPushState.callCount).to.be.equal(2)
    })
  })

  describe('Going back through history', () => {
    it('should go back', () => {
      const spyBack = sandbox.spy(window.history, 'back')

      Router.back()

      expect(spyBack.calledOnce).to.be.equal(true)
    })

    it('should navigate to the back page', () => {
      Router.navigate('/login')
      Router.navigate('/chat')
      Router.back()

      window.addEventListener(
        'popstate',
        () => {
          expect('/login').to.be.eqls(window.location.pathname)
        },
        { once: true }
      )
    })

    it('should render back page', () => {
      Router.navigate('/login')
      Router.navigate('/chat')
      Router.back()

      window.addEventListener(
        'popstate',
        () => {
          const loginPage = container.querySelector('#test-login')
          expect(loginPage).to.not.equal(null)
        },
        { once: true }
      )
    })
  })

  describe('Going forward through history', () => {
    it('should go forward', () => {
      const spyGo = sandbox.spy(window.history, 'forward')

      Router.forward()

      expect(spyGo.calledOnce).to.be.equal(true)
    })
  })
})
