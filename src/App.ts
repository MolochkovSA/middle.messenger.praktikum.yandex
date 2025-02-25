import './components'
import './layout'
import { AppRoutes, router } from './router'

type State = { currentPage: AppRoutes }

interface IApp {
  readonly state: State
  readonly appElement: HTMLDivElement
  render(): void
}

export class App implements IApp {
  appElement: HTMLDivElement
  state: State

  constructor() {
    this.appElement = document.querySelector<HTMLDivElement>('#app')!

    const currentPath = window.location.pathname

    this.state = {
      currentPage: Object.values<string>(AppRoutes).includes(currentPath)
        ? (currentPath as AppRoutes)
        : AppRoutes.NOTFOUND,
    }
  }

  render() {
    const route = router[this.state.currentPage]

    if (typeof route === 'function') {
      this.appElement.replaceChildren(new route().getContent())

      return
    } else {
      this.appElement.innerHTML = route
      this.attachEventListeners()
    }
  }

  attachEventListeners() {
    document.querySelectorAll('[data-page]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()

        const element = e.currentTarget

        if (element instanceof HTMLAnchorElement) {
          const page = element.dataset.page
          this.changePage(page as AppRoutes)
        }
      })
    })
  }

  changePage(page: AppRoutes) {
    this.state.currentPage = page
    this.render()
  }
}
