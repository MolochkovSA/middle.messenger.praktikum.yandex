import Handlebars from 'handlebars'

import { compareObjects } from '@/utils'

import { EventBus } from './event-bus'
import { BlockEvents, Children, EventListeners, Meta, Props } from './types'

export abstract class Block {
  private _id: string
  private _eventBus: EventBus
  private _element: HTMLElement | null
  private _children: Children
  private _props: Props
  private _events: EventListeners

  constructor({ props = {}, events = {}, children = {} }: Meta = {}) {
    this._id = crypto.randomUUID()
    this._eventBus = new EventBus()
    this._element = null
    this._children = children
    this._props = this._makePropsProxy(props)
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

    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => component.init())
      } else {
        child.init()
      }
    })
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

  private _isProps(obj: unknown): obj is Props {
    return obj !== null && typeof obj === 'object'
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown): void {
    if (!this._isProps(oldProps) || !this._isProps(newProps)) return

    const response: boolean = this.componentDidUpdate(oldProps, newProps)

    if (!response) {
      this._eventBus.emit(BlockEvents.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return compareObjects(oldProps, newProps)
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

    const propsAndStubs: Props = { ...this._props }

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((component) => `<div data-id="${component._id}"></div>`)
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      }
    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs)

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

    this._element = fragment.content.firstElementChild as HTMLElement

    this._addEvents()
  }

  render(): string {
    return ''
  }

  private _makePropsProxy(props: Props): Props {
    const emitBind = this._eventBus.emit.bind(this._eventBus)

    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set(target: Props, prop: string, value: unknown) {
        const oldTarget: Props = structuredClone(target)
        target[prop] = value

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

  getProps(): Props {
    return this._props
  }

  setProps(nextProps: Partial<Props>): void {
    if (!nextProps) {
      return
    }

    Object.assign(this._props, nextProps)
  }

  getChildren(): Children {
    return this._children
  }

  hide(): void {
    this.getContent().style.display = 'none'
  }

  show(): void {
    this.getContent().style.display = 'block'
  }
}
