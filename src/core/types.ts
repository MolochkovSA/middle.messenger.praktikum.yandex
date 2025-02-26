import { Block } from './block'

export type EventCallback = (...args: unknown[]) => void

export enum BlockEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export type Props = Record<string, unknown>
export type Children = Record<string, Block | Block[]>
export type EventListeners = { [key in keyof HTMLElementEventMap]?: (e: Event) => void }

export type Meta = {
  props?: Props
  events?: EventListeners
  children?: Children
}
