import Handlebars from 'handlebars'

import { areObjsEqual } from '@/utils'

import { EventBus } from './event-bus'

enum BlockEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

type Props = Record<string, unknown>
type Children = Record<string, Block | Block[]>
type EventListeners = { [key in keyof HTMLElementEventMap]?: (e: Event) => void }

type Meta<P extends Props, E extends EventListeners, C extends Children> = {
  props?: P
  events?: E
  children?: C
}

export abstract class Block<
  P extends Props = Props,
  E extends EventListeners = EventListeners,
  C extends Children = Children
> {
  private _id: string
  private _eventBus: EventBus
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
    this._eventBus.on(BlockEvents.FLOW_CDU, this._componentDidUpdate.bind(this))
    this._eventBus.on(BlockEvents.FLOW_RENDER, this._render.bind(this))
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

  private _isProps(obj: unknown): obj is P {
    return obj !== null && typeof obj === 'object'
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown): void {
    if (!this._isProps(oldProps) || !this._isProps(newProps)) return

    const isEqual: boolean = this.componentDidUpdate(oldProps, newProps)

    if (!isEqual) {
      this._eventBus.emit(BlockEvents.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P): boolean {
    return areObjsEqual(oldProps, newProps)
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

  private _makeObjProxy<T extends Record<string, unknown>>(obj: T): T {
    const emitBind = this._eventBus.emit.bind(this._eventBus)

    return new Proxy(obj, {
      get(target: T, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set(target: T, prop: string, value: unknown) {
        const oldTarget = { ...target }

        ;(target as Record<string, unknown>)[prop] = value

        emitBind(BlockEvents.FLOW_CDU, oldTarget, target)
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

  remove(): void {
    this.getContent().remove()
  }
}
