import { EventBus } from '@/core/event-bus'
import { InputValidationService } from './inputValidationService'
import { InputName } from '@/components/common/input'

export class FormControlService {
  private _eventBus: EventBus<string>
  private _forms: HTMLFormElement[]

  constructor() {
    this._eventBus = new EventBus<string>()
    this._forms = []
    this.attachErrorListener = this.attachErrorListener.bind(this)
  }

  init(element: HTMLElement): void {
    this._forms = Array.from(element.querySelectorAll('form'))

    this._forms.forEach((form) => {
      const inputs = form.querySelectorAll('input')
      const submitButton = form.querySelector('[type=submit]')

      inputs.forEach((input) => {
        input.addEventListener('blur', () => {
          const errorMeasage = InputValidationService.checkValue(input.name as InputName, input.value)
          this._eventBus.emit(input.id, errorMeasage)
        })
      })

      form.addEventListener('submit', (e) => {
        e.preventDefault()
        inputs.forEach((input) => {
          console.log(input.id, input.value)
        })
      })
    })
  }

  attachErrorListener(event: string, listener: (errorMessage: string) => void) {
    this._eventBus.on(event, listener)
  }
}
