import { EventBus } from '@/core'
import { InputValidationService, ValidationSchemaName } from './inputValidationService'

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
  private _inputsValidationRules: Record<string, ValidationSchemaName | undefined>

  constructor() {
    this._eventBus = new EventBus<string>()
    this._forms = []
    this._inputsValidationRules = {}
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

  validate(validationSchema: ValidationSchemaName) {
    return (event: string, listener: (errorMessage: string) => void) => {
      this._inputsValidationRules[event] = validationSchema
      this._eventBus.on(event, listener)
    }
  }

  private _attachBlurHandlers(form: Form): void {
    const inputs: FormInput[] = Object.values(form.inputs)
    const passwordInputs = inputs.filter(({ element }) => this._inputsValidationRules[element.id] === 'equalPassword')

    inputs.forEach(({ element }) => {
      const valitionSchemaName = this._inputsValidationRules[element.id]

      if (valitionSchemaName) {
        element.onblur = () => {
          if (valitionSchemaName === 'equalPassword') {
            this._checkEqualPasswords(passwordInputs, form.inputs[element.id], element, valitionSchemaName)
            return
          }

          this._checkInputValue(form.inputs[element.id], element, valitionSchemaName)
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
}
