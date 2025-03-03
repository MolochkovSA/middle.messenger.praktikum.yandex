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

export class InputField extends Block<
  Omit<InputFieldProps, 'errorListener'> & Pick<InputProps, 'id'>,
  {},
  InputFieldChildren
> {
  constructor({ label, className, isError, errorMessage, errorListener, ...inputProps }: InputFieldInitProps) {
    const id = crypto.randomUUID()
    super({
      props: { id, label, className, isError, errorMessage },
      children: {
        Input: new Input({ ...inputProps, id }),
      },
    })

    if (errorListener) {
      errorListener(id, (errorMessage: string) => {
        this.setProps({ errorMessage })
      })
    }
  }

  render(): string {
    return inputFieldTemplate
  }
}
