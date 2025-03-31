import { Block } from './block'
import { expect } from 'chai'
import sinon from 'sinon'

describe('Block', () => {
  type PageProps = {
    title: string
  }

  type PageEvents = {
    click?: () => void
  }

  let PageComponent: new ({ title, click }: PageProps & PageEvents) => Block

  before(() => {
    class Page extends Block<PageProps, PageEvents> {
      constructor({ title, click }: PageProps & PageEvents) {
        super({
          props: { title },
          events: { click },
        })
      }

      render() {
        return `
          <div>
            <h1 id='test-title'>{{title}}</h1> 
          </div>
        `
      }
    }

    PageComponent = Page
  })

  it('should create a stateful component from the constructor', () => {
    const text = 'Title'

    const page = new PageComponent({ title: text })
    const titleText = page.getContent().querySelector('#test-title')?.textContent

    expect(text).to.be.equal(titleText)
  })

  it('should have a reactive behavior', () => {
    const newText = 'New title'
    const page = new PageComponent({ title: 'Title' })
    page.setProps({ title: newText })
    const titleText = page.getContent().querySelector('#test-title')?.textContent

    expect(newText).to.be.equal(titleText)
  })

  it('should`t render if the props are the same', () => {
    const newText = 'Title'
    const page = new PageComponent({ title: 'Title' })
    const spyRENDER = sinon.spy(page, 'render')
    page.setProps({ title: newText })

    expect(spyRENDER.called).to.be.false
  })

  it('should set events on the element', () => {
    const clickhadnlerStub = sinon.stub()
    const page = new PageComponent({
      title: 'Title',
      click: clickhadnlerStub,
    })
    const event = new MouseEvent('click')
    page.getContent()?.dispatchEvent(event)

    expect(clickhadnlerStub.calledOnce).to.be.true
  })

  it('should call the dispatchComponentDidMount method', () => {
    const page = new PageComponent({
      title: 'Title',
    })

    const spyCDM = sinon.spy(page, 'dispatchComponentDidMount')

    page.dispatchComponentDidMount()

    expect(spyCDM.calledOnce).to.be.true
  })
})
