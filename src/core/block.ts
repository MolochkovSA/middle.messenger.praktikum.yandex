import Handlebars from 'handlebars'

import { areObjectsEqual } from '@/utils'
import { Indexed } from '@/types'

import { EventBus } from './event-bus'

enum BlockEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_SCU = 'flow:should-component-update',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
  FLOW_UNMOUNT = 'flow:component-will-unmount',
}

type Children = Record<string, Block | Block[]>
type EventListeners = { [key in keyof HTMLElementEventMap]?: (e: Event) => void }

type Meta<P extends Indexed, E extends EventListeners, C extends Children> = {
  props?: P
  events?: E
  children?: C
}

export abstract class Block<
  P extends Indexed = Indexed,
  E extends EventListeners = EventListeners,
  C extends Children = Children
> {
  private _id: string
  private _eventBus: EventBus<P>
  private _element: HTMLElement | null
  private _children: C
  private _props: P
  private _events: E

  constructor({ props = {} as P, events = {} as E, children = {} as C }: Meta<P, E, C> = {}) {
    this._id = crypto.randomUUID()
    this._eventBus = new EventBus()
    this._element = null
    this._children = children
    this._props = this._makeObjProxy(props)
    this._events = events

    this._registerEvents()
    this._eventBus.emit(BlockEvents.INIT)
  }

  private _registerEvents(): void {
    this._eventBus.on(BlockEvents.INIT, this.init.bind(this))
    this._eventBus.on(BlockEvents.FLOW_CDM, this._componentDidMount.bind(this))
    this._eventBus.on(BlockEvents.FLOW_SCU, this._componentShouldUpdate.bind(this))
    this._eventBus.on(BlockEvents.FLOW_CDU, this._componentDidUpdate.bind(this))
    this._eventBus.on(BlockEvents.FLOW_RENDER, this._render.bind(this))
    this._eventBus.on(BlockEvents.FLOW_UNMOUNT, this._componentWillUnmount.bind(this))
  }

  init(): void {
    this._eventBus.emit(BlockEvents.FLOW_RENDER)
  }

  private _componentDidMount(): void {
    this.componentDidMount()

    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => component.dispatchComponentDidMount())
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  protected componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this._eventBus.emit(BlockEvents.FLOW_CDM)
  }

  private _componentShouldUpdate(oldProps: P, newProps: P): void {
    const isEqual: boolean = this.shouldComponentUpdate(oldProps, newProps)

    if (!isEqual) {
      this._eventBus.emit(BlockEvents.FLOW_RENDER)
    }
  }

  protected shouldComponentUpdate(oldProps: P, newProps: P): boolean {
    return areObjectsEqual(oldProps, newProps)
  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    this.componentDidUpdate(oldProps, newProps)
  }

  protected componentDidUpdate(oldProps: P, newProps: P): void {}

  protected _componentWillUnmount(): void {
    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => component.dispatchComponentWillUnmount())
      } else {
        child.dispatchComponentWillUnmount()
      }
    })

    this.componentWillUnmount()
    this._removeEvents()
    this.getContent().remove()
  }

  protected componentWillUnmount(): void {}

  dispatchComponentWillUnmount(): void {
    this._eventBus.emit(BlockEvents.FLOW_UNMOUNT)
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName)
  }

  private _addEvents(): void {
    Object.entries(this._events).forEach(([eventName, callback]) => {
      if (this._element) {
        this._element.addEventListener(eventName, callback)
      }
    })
  }

  private _removeEvents(): void {
    Object.entries(this._events).forEach(([eventName, callback]) => {
      if (this._element) {
        this._element.removeEventListener(eventName, callback)
      }
    })
  }

  private _render(): void {
    this._removeEvents()

    const template: string = this.render()

    const childrens: Record<string, string | string[]> = {}

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        childrens[key] = child.map((component) => `<div data-id="${component._id}"></div>`)
      } else {
        childrens[key] = `<div data-id="${child._id}"></div>`
      }
    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement
    fragment.innerHTML = Handlebars.compile(template)({ ...this._props, ...childrens })

    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(`[data-id="${component._id}"]`)

          stub?.replaceWith(component.getContent())
        })
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

        stub?.replaceWith(child.getContent()!)
      }
    })

    const newElement = fragment.content.firstElementChild as HTMLElement

    if (this._element) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement
    this._addEvents()
  }

  render(): string {
    return ''
  }

  private _makeObjProxy(obj: P): P {
    const emitBind = this._eventBus.emit.bind(this._eventBus)

    return new Proxy(obj, {
      get(target: P, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set(target: P, prop: string, value: unknown) {
        const oldTarget = { ...target }

        ;(target as Indexed)[prop] = value

        emitBind(BlockEvents.FLOW_SCU, oldTarget, target)
        return true
      },

      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('No element')
    }
    return this._element
  }

  getProps(): P {
    return this._props
  }

  setProps(nextProps: Partial<P>): void {
    if (!nextProps) {
      return
    }

    Object.assign(this._props, nextProps)
  }

  getChildren(): C {
    return this._children
  }

  setChildren(nextChildren: Partial<C>): void {
    if (!nextChildren) {
      return
    }

    Object.assign(this._children, nextChildren)
  }
}
