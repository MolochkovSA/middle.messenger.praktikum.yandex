import { arePrimitivesEqual } from '@/utils'
import { Block } from './block'

export type RouteProps = {
  pathname: string
  block: new () => Block
}

export class Route {
  private _container: HTMLElement
  private _pathname: string
  private _blockClass: new () => Block
  private _block: Block | null

  constructor(container: HTMLElement, { pathname, block }: RouteProps) {
    this._container = container
    this._pathname = pathname
    this._blockClass = block
    this._block = null
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.render()
    }
  }

  leave(): void {
    if (this._block) {
      this._block.remove()
    }
  }

  match(pathname: string): boolean {
    return arePrimitivesEqual(pathname, this._pathname)
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass()
    }

    this._container.replaceChildren(this._block.getContent())
    this._block.dispatchComponentDidMount()
  }
}
