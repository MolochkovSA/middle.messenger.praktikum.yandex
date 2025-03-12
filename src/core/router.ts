import { Route, RouteProps } from './route'

type Props = {
  container: HTMLElement
  routeConfig: RouteProps[]
}

export class Router {
  private static _routes: Route[] = []
  private static _commonRoute: Route | null = null
  private static _history: History = window.history
  private static _currentRoute: Route | null = null
  private static _isInit = false

  private constructor() {}

  static init({ container, routeConfig }: Props) {
    if (Router._isInit) return

    routeConfig.forEach((props) => {
      if (props.pathname === '*') {
        Router._commonRoute = new Route(container, props)
      } else {
        Router._use(container, props)
      }
    })

    Router._start()

    Router._isInit = true
  }

  static navigate(value: string | number) {
    if (!Router._isInit) {
      throw new Error('Router is not initialized')
    }

    if (typeof value === 'string') {
      Router._history.pushState({}, '', value)
      Router._onRoute(value)
    }

    if (typeof value === 'number') {
      Router._go(value)
    }
  }

  static back() {
    Router._history.back()
  }

  static forward() {
    Router._history.forward()
  }

  private static _use(container: HTMLElement, props: RouteProps) {
    const route = new Route(container, props)
    Router._routes.push(route)
  }

  private static _start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window
      Router._onRoute(target.location.pathname)
    }

    Router._onRoute(window.location.pathname)
  }

  private static _onRoute(pathname: string) {
    const route = Router._routes.find((route) => route.match(pathname)) ?? Router._commonRoute

    if (!route) {
      return
    }

    if (Router._currentRoute && Router._currentRoute !== route) {
      Router._currentRoute.leave()
    }

    Router._currentRoute = route
    route.render()
  }

  private static _go(delta: number) {
    Router._history.go(delta)
  }
}
