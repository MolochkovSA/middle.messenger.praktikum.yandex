import { Block } from '@/core'
import { Input, InputProps, InputEvents } from '@/components/common/input'

import { inputFieldTemplate } from './inputField.tmpl'

type InputFieldProps = {
  label?: string
  className?: string
  isError?: boolean
  errorMessage?: string
  errorListener?: (event: string, listener: (errorMessage: string) => void) => void
}
type InputFieldChildren = { Input: Input }
export type InputFieldInitProps = Omit<InputProps, 'id'> & InputFieldProps & InputEvents

export class InputField extends Block<InputFieldProps & Pick<InputProps, 'id'>, InputEvents, InputFieldChildren> {
  constructor({ label, className, isError, errorMessage, errorListener, ...inputProps }: InputFieldInitProps) {
    const id = crypto.randomUUID()
    super({
      props: { id, label, className, isError, errorMessage, errorListener },
      children: {
        Input: new Input({ ...inputProps, id }),
      },
    })
  }

  render(): string {
    return inputFieldTemplate
  }

  componentDidMount(): void {
    const { errorListener: errorEmitter } = this.getProps()

    if (errorEmitter) {
      const eventKey: string = this.getProps().id

      errorEmitter(eventKey, (errorMessage: string) => {
        this.setProps({ errorMessage })
      })
    }
  }
}
