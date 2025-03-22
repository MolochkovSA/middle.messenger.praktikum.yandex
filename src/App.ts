import './layout'
import { Router } from './core'
import { routeConfig } from './config/routeConfig'
import { NotificationService } from './services/'

export class App {
  private _appElement: HTMLElement

  constructor() {
    this._appElement = document.getElementById('app')!
  }

  render() {
    Router.init({ container: this._appElement, routeConfig })
    NotificationService.init({ container: this._appElement })
  }
}
