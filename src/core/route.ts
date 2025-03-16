import { arePrimitivesEqual } from '@/utils'
import { Block } from './block'

type Loader = () => Promise<unknown>

export type RouteProps = {
  pathname: string
  block: new () => Block
  loader?: Loader
  hydrateFallbackElement?: (new () => Block) | HTMLElement | string
}

export class Route {
  private _container: HTMLElement
  private _pathname: string
  private _blockClass: new () => Block
  private _block: Block | null
  private _loader: Loader | undefined
  private _loaderData: unknown
  private _hydrateFallbackElement: (new () => Block) | HTMLElement | string
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
    if (!this._loader) {
      return this._render()
    }

    this._isLoading = true

    this._loader()
      .then((data) => {
        this._loaderData = data
        this._isLoading = false
        this._render()
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.error(err.message)
        }
      })
      .finally(() => {
        this._isLoading = false
      })
  }

  private _render(): void {
    if (this._isLoading) {
      if (this._hydrateFallbackElement instanceof HTMLElement || typeof this._hydrateFallbackElement === 'string') {
        return this._container.replaceChildren(this._hydrateFallbackElement)
      }
      return this._container.replaceChildren(new this._hydrateFallbackElement().getContent())
    }

    this._block = new this._blockClass()
    this._container.replaceChildren(this._block.getContent())
    this._block.dispatchComponentDidMount()
  }

  getLoaderData<T>(): T {
    return this._loaderData as T
  }
}
