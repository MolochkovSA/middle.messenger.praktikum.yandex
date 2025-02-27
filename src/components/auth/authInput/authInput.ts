import { Block } from '@/core'
import { Input, InputProps } from '@/components/common/input'

import { AuthInputTemplate } from './authInput.tmpl'

import styles from './authInput.module.scss'

type AuthInputProps = Omit<InputProps, 'id'> & {
  label?: string
  isError?: boolean
  errorMessage?: string
  errorEmitter?: (event: string, listener: (errorMessage: string) => void) => void
}

export class AuthInput extends Block {
  constructor({ label, isError, errorMessage, errorEmitter, ...inputProps }: AuthInputProps) {
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

    if (!errorEmitter) return
    ;(errorEmitter as (event: string, listener: (errorMessage: string) => void) => void)(
      this.getProps().id as string,
      (errorMessage: string) => {
        console.log(errorMessage)

        this.setProps({ errorMessage })
      }
    )
  }
}
