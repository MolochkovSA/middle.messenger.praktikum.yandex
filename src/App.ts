import './components'
import { AppRoutes, router } from './router'

type State = { currentPage: AppRoutes }

interface IApp {
  readonly state: State
  readonly appElement: HTMLDivElement
  render(): void
}

const defaultState: State = { currentPage: AppRoutes.PROFILE }

export class App implements IApp {
  appElement: HTMLDivElement
  state: State

  constructor() {
    this.appElement = document.querySelector<HTMLDivElement>('#app')!
    this.state = defaultState
  }

  render() {
    this.appElement.innerHTML = router[this.state.currentPage]
    document.querySelectorAll('[data-page]').forEach((link) => {
      console.log(link)

      link.addEventListener('click', (e) => {
        e.preventDefault()

        // @ts-ignore
        const page = e?.currentTarget?.dataset.page
        console.log(page)
      })
    })
  }
}
