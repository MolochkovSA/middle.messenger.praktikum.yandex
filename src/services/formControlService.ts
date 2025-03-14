import { EventBus } from '@/core'
import { InputValidationService, ValidationSchemaName } from './inputValidationService'

type FormInput = { element: HTMLInputElement; errorMessage?: string }
type FormInputs = Record<string, FormInput>
type SubmitHandler = (args: { event: Event; formData: FormData }) => void

export class FormControlService {
  private _inputs: FormInputs
  private _eventBus: EventBus<string>
  private _inputsValidationRules: Record<string, ValidationSchemaName | undefined>
  private _submitHandler?: SubmitHandler

  constructor() {
    this._inputs = {}
    this._eventBus = new EventBus<string>()
    this._inputsValidationRules = {}
  }

  init(element: HTMLElement): void {
    const formElement: HTMLFormElement | null = element.querySelector('form')

    if (!formElement) return

    const inputElements = formElement.querySelectorAll('input')
    this._inputs = Object.fromEntries(Array.from(inputElements).map((input) => [input.id, { element: input }]))

    this._attachBlurHandlers()
    this._attachSubmitHandler(formElement)
  }

  validate(validationSchema: ValidationSchemaName) {
    return (event: string, listener: (errorMessage: string) => void) => {
      this._inputsValidationRules[event] = validationSchema
      this._eventBus.on(event, listener)
    }
  }

  attachSubmitHandler(handler: SubmitHandler) {
    this._submitHandler = handler
  }

  private _attachBlurHandlers(): void {
    const inputs = Object.values(this._inputs)
    const passwordInputs = inputs.filter(({ element }) => this._inputsValidationRules[element.id] === 'equalPassword')

    inputs.forEach(({ element }) => {
      const valitionSchemaName = this._inputsValidationRules[element.id]

      if (valitionSchemaName) {
        element.onblur = () => {
          if (valitionSchemaName === 'equalPassword') {
            this._checkEqualPasswords(passwordInputs, this._inputs[element.id], element, valitionSchemaName)
            return
          }

          this._checkInputValue(this._inputs[element.id], element, valitionSchemaName)
        }
      }
    })
  }

  private _attachSubmitHandler(formElement: HTMLFormElement): void {
    formElement.onsubmit = (e) => {
      e.preventDefault()

      if (this._isError()) return

      const formData = new FormData(e.target as HTMLFormElement)

      if (this._submitHandler) this._submitHandler({ event: e, formData })

      // formElement.reset()
    }
  }

  private _checkInputValue(
    input: FormInput,
    element: HTMLInputElement,
    valitionSchemaName: ValidationSchemaName
  ): boolean {
    const errorMeasage = InputValidationService.checkValue(valitionSchemaName, element.value)
    input.errorMessage = errorMeasage
    this._eventBus.emit(element.id, errorMeasage)

    return !errorMeasage
  }

  private _checkEqualPasswords(
    passwordInputs: FormInput[],
    targetInput: FormInput,
    targetElement: HTMLInputElement,
    valitionSchemaName: ValidationSchemaName
  ): void {
    const isError = this._checkInputValue(targetInput, targetElement, valitionSchemaName)

    if (!isError) return

    const errorMeasage = InputValidationService.checkEqualPasswords(passwordInputs.map((input) => input.element.value))

    passwordInputs.forEach((input) => {
      input.errorMessage = errorMeasage
      this._eventBus.emit(input.element.id, errorMeasage)
    })
  }

  private _isError(): boolean {
    const inputElements = Object.values(this._inputs)

    inputElements.forEach(({ element }) => {
      element.dispatchEvent(new Event('blur'))
    })

    return inputElements.some((input) => input.errorMessage)
  }
}
