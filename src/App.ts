import './components'
import './layout'
import { AppRoutes, router } from './router'

type State = { currentPage: AppRoutes }

interface IApp {
  readonly state: State
  readonly appElement: HTMLDivElement
  render(): void
}

const defaultState: State = { currentPage: AppRoutes.NOTFOUND }

export class App implements IApp {
  appElement: HTMLDivElement
  state: State

  constructor() {
    this.appElement = document.querySelector<HTMLDivElement>('#app')!
    this.state = defaultState

    const currentPath = window.location.pathname

    this.state.currentPage = Object.values<string>(AppRoutes).includes(currentPath)
      ? (currentPath as AppRoutes)
      : AppRoutes.NOTFOUND
  }

  render() {
    this.appElement.innerHTML = router[this.state.currentPage]
    console.log(this.state.currentPage)

    document.querySelectorAll('[data-page]').forEach((link) => {
      console.log(link)

      link.addEventListener('click', (e) => {
        console.log('events')

        e.preventDefault()

        // @ts-ignore
        const page = e?.currentTarget?.dataset.page
        this.state.currentPage = page as AppRoutes
        this.render()
      })
    })
  }
}
