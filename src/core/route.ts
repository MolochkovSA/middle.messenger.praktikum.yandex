import { arePrimitivesEqual } from '@/utils'
import { Block } from './block'

type Loader = () => unknown

export type RouteProps = {
  pathname: string
  block: new () => Block
  loader?: Loader
  hydrateFallbackElement?: HTMLElement | string
}

export class Route {
  private _container: HTMLElement
  private _pathname: string
  private _blockClass: new () => Block
  private _block: Block | null
  private _loader: Loader | undefined
  private _loaderData: unknown
  private _hydrateFallbackElement: HTMLElement | string
  private _isLoading = false

  constructor(container: HTMLElement, { pathname, block, loader, hydrateFallbackElement = '' }: RouteProps) {
    this._container = container
    this._pathname = pathname
    this._blockClass = block
    this._block = null
    this._loader = loader
    this._hydrateFallbackElement = hydrateFallbackElement
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.render()
    }
  }

  leave(): void {
    this._block?.dispatchComponentWillUnmount()
    this._block = null
  }

  match(pathname: string): boolean {
    return arePrimitivesEqual(pathname, this._pathname)
  }

  render(): void {
    const loader = this._loader

    if (loader) {
      new Promise((resolve) => {
        this._isLoading = true
        resolve(loader())
      }).then((data) => {
        this._loaderData = data
        this._isLoading = false
        this._render()
      })
    }

    this._render()
  }

  private _render(): void {
    if (this._isLoading) {
      return this._container.replaceChildren(this._hydrateFallbackElement)
    }

    this._block = new this._blockClass()
    this._container.replaceChildren(this._block.getContent())
    this._block.dispatchComponentDidMount()
  }

  getLoaderData<T>(): T {
    return this._loaderData as T
  }
}
