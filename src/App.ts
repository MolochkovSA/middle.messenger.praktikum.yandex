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
    this.appElement.innerHTML = router[this.state.currentPage]
    this.attachEventListeners()
  }

  attachEventListeners() {
    document.querySelectorAll('[data-page]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()

        // @ts-ignore
        const page = e?.currentTarget?.dataset.page
        this.changePage(page as AppRoutes)
      })
    })
  }

  changePage(page: AppRoutes) {
    this.state.currentPage = page
    this.render()
  }
}
