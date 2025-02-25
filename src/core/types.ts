import { Block } from './block'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventCallback = (...args: any[]) => void

export enum BlockEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export type Attributes = Record<string, string | number | boolean>
export type Props = Record<string, unknown>
export type Children = Record<string, Block>
export type EventsListeners = { [key in keyof HTMLElementEventMap]?: ((e: Event) => void) | undefined }

export type Meta = {
  tagName: string
  props?: Props
  className?: string
  attrs?: Attributes
  events?: EventsListeners
  children?: Children
}
