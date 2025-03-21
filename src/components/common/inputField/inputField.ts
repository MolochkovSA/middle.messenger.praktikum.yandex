import { Block } from '@/core'
import { Input, InputProps, InputEvents } from '@/components/common/input'

export type InputFieldProps = {
  label?: string
  className?: string
  errorMessage?: string
  errorListener?: (event: string, listener: (errorMessage: string) => void) => void
} & Omit<InputProps, 'id'> &
  InputEvents

type InputFieldChildren = { Input: Input }

export class InputField extends Block<
  Omit<InputFieldProps, 'errorListener'> & Pick<InputProps, 'id'>,
  {},
  InputFieldChildren
> {
  constructor({ label, className, errorMessage, errorListener, ...inputProps }: InputFieldProps) {
    const id = crypto.randomUUID()
    super({
      props: { id, label, className, errorMessage, ...inputProps },
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
    const { value, disabled } = this.getProps()
    const { Input } = this.getChildren()

    Input.setProps({ value, disabled })

    return `
      <div class="{{className}}">
        {{{ Input }}}
        
        {{#if label}}
          <label for="{{id}}">{{label}}</label>
        {{/if}} 

        {{#if errorMessage}}
          <p>{{errorMessage}}</p>
        {{/if}}  
      </div>
    `
  }
}
