import { EventBus } from '@/core/event-bus'
import { InputValidationService } from './inputValidationService'

type FormInput = { element: HTMLInputElement; errorMessage?: string }
type FormInputs = Record<string, FormInput>
class Form {
  get isError(): boolean {
    const inputElements = Object.values(this.inputs)

    inputElements.forEach(({ element }) => {
      element.dispatchEvent(new Event('blur'))
    })

    return inputElements.some((input) => input.errorMessage)
  }

  constructor(public element: HTMLFormElement, public inputs: FormInputs, public submitButton?: HTMLButtonElement) {}
}

export class FormControlService {
  private _eventBus: EventBus<string>
  private _forms: Form[]

  constructor() {
    this._eventBus = new EventBus<string>()
    this._forms = []
    this.attachErrorHandler = this.attachErrorHandler.bind(this)
  }

  init(element: HTMLElement): void {
    const formElements: HTMLFormElement[] = Array.from(element.querySelectorAll('form'))

    formElements.forEach((formElement) => {
      const form = this._createForm(formElement)
      this._forms.push(form)
      this._attachBlurHandlers(form)
      this._attachSubmitHandler(form)
    })
  }

  attachErrorHandler(event: string, listener: (errorMessage: string) => void) {
    this._eventBus.on(event, listener)
  }

  private _attachBlurHandlers(form: Form): void {
    Object.values(form.inputs).forEach(({ element }) => {
      const valitionSchemaName = element.dataset.validator

      if (InputValidationService.isValidationSchemaName(valitionSchemaName)) {
        element.onblur = () => {
          const errorMeasage = InputValidationService.checkValue(valitionSchemaName, element.value)
          form.inputs[element.id].errorMessage = errorMeasage
          this._eventBus.emit(element.id, errorMeasage)
        }
      }
    })
  }

  private _attachSubmitHandler(form: Form): void {
    form.element.onsubmit = (e) => {
      e.preventDefault()

      if (form.isError) return

      const formData = new FormData(e.target as HTMLFormElement)

      console.log(Object.fromEntries(formData))

      form.element.reset()
    }
  }

  private _createForm(form: HTMLFormElement): Form {
    const inputElements = form.querySelectorAll('input')
    const submitButton = form.querySelector<HTMLButtonElement>('[type=submit]') ?? undefined

    const inputs = Object.fromEntries(Array.from(inputElements).map((input) => [input.id, { element: input }]))

    return new Form(form, inputs, submitButton)
  }
}
