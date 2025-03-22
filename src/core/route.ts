import { arePrimitivesEqual } from '@/utils'
import { Block } from './block'
import { logger } from '@/services/loggerService'

type Loader = () => Promise<unknown>

export type RouteProps = {
  pathname: string
  block: new () => Block
  loader?: Loader
  hydrateFallbackElement?: (new () => Block) | HTMLElement | string
}

export class Route {
  private _context = Route.name + '.'
  private _container: HTMLElement
  private _pathname: string
  private _blockClass: new () => Block
  private _block: Block | null
  private _loader: Loader | undefined
  private _loaderData: unknown
  private _hydrateFallbackElement: (new () => Block) | HTMLElement | string

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
      this.load()
    }
  }

  leave(): void {
    this._block?.dispatchComponentWillUnmount()
    this._block = null
  }

  match(pathname: string): boolean {
    return arePrimitivesEqual(pathname, this._pathname)
  }

  load(): void {
    const context = this._context + this.load.name

    logger.warn(context, this._pathname)

    if (!this._loader) {
      return this._render()
    }

    logger.info(context, this._pathname + ' start loading')
    this._renderFallbackElement()

    this._loader()
      .then((data) => {
        this._loaderData = data
        logger.info(context, this._pathname + ' end loading')
        this._render()
      })
      .catch((err) => {
        if (err instanceof Error) {
          logger.error(context, err.message)
        }
      })
  }

  private _render(): void {
    logger.warn(this._context + this._render.name, this._pathname)
    this._block = new this._blockClass()
    this._container.replaceChildren(this._block.getContent())
    this._block.dispatchComponentDidMount()
  }

  private _renderFallbackElement(): void {
    logger.warn(this._context + this._renderFallbackElement.name, this._pathname)
    if (this._hydrateFallbackElement instanceof HTMLElement || typeof this._hydrateFallbackElement === 'string') {
      this._container.replaceChildren(this._hydrateFallbackElement)
    } else {
      this._container.replaceChildren(new this._hydrateFallbackElement().getContent())
    }
  }

  getLoaderData<T>(): T {
    return this._loaderData as T
  }
}
