import './components'
import './layout'
import { AppRoutes, router } from './router'

type State = { currentPage: AppRoutes }

export class App {
  private _appElement: HTMLDivElement
  private _state: State

  constructor() {
    this._appElement = document.querySelector<HTMLDivElement>('#app')!

    const currentPath = window.location.pathname

    this._state = {
      currentPage: Object.values<string>(AppRoutes).includes(currentPath)
        ? (currentPath as AppRoutes)
        : AppRoutes.NOTFOUND,
    }
  }

  render() {
    const route = router[this._state.currentPage]
    const page = new route()

    this._appElement.replaceChildren(page.getContent())
    page.dispatchComponentDidMount()
    this._attachEventListeners()
  }

  private _attachEventListeners() {
    document.querySelectorAll('[data-page]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()

        const element = e.currentTarget

        if (element instanceof HTMLAnchorElement) {
          const page = element.dataset.page
          this._changePage(page as AppRoutes)
        }
      })
    })
  }

  private _changePage(page: AppRoutes) {
    this._state.currentPage = page
    this.render()
  }
}
