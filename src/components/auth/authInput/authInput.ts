import { Block } from '@/core'
import { Input, InputProps, InputEvents } from '@/components/common/input'

import { AuthInputTemplate } from './authInput.tmpl'

import styles from './authInput.module.scss'

type AuthInputProps = {
  label?: string
  isError?: boolean
  errorMessage?: string
  errorEmitter?: (event: string, listener: (errorMessage: string) => void) => void
}

type AuthInputChildren = { Input: Input }

export class AuthInput extends Block<AuthInputProps & Pick<InputProps, 'id'>, InputEvents, AuthInputChildren> {
  constructor({
    label,
    isError,
    errorMessage,
    errorEmitter,
    ...inputProps
  }: Omit<InputProps, 'id'> & AuthInputProps & InputEvents) {
    const id = crypto.randomUUID()
    super({
      props: { id, label, isError, errorMessage, errorEmitter },
      children: {
        Input: new Input({ ...inputProps, id, className: styles.input }),
      },
    })
  }

  render(): string {
    return AuthInputTemplate
  }

  componentDidMount(): void {
    const { errorEmitter } = this.getProps()

    if (errorEmitter) {
      const eventKey: string = this.getProps().id

      errorEmitter(eventKey, (errorMessage: string) => {
        this.setProps({ errorMessage })
      })
    }
  }
}
