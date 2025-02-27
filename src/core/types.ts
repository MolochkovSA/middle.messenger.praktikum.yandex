import { Block } from './block'

export type EventCallback<T = unknown> = (...args: T[]) => void

export enum BlockEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export type Props = Record<string, unknown>
export type Children = Record<string, Block | Block[]>
export type EventListeners = { [key in keyof HTMLElementEventMap]?: (e: Event) => void }

export type Meta<P extends Props, E extends EventListeners, C extends Children> = {
  props?: P
  events?: E
  children?: C
}
