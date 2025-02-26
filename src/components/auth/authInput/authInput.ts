import { Block } from '@/core'
import { Input, InputProps } from '@/components/common/input'

import { AuthInputTemplate } from './authInput.tmpl'

import styles from './authInput.module.scss'

type AuthInputProps = Omit<InputProps, 'id'> & {
  label?: string
  isError?: boolean
  errorMessage?: string
}

export class AuthInput extends Block {
  constructor({ className, label, isError, errorMessage, ...inputProps }: AuthInputProps) {
    const id = crypto.randomUUID()
    super({
      tagName: 'div',
      className: `${styles.authInput} ${isError ? styles.isError : ''} ${className ?? ''}`.trim(),
      props: { id, label, errorMessage },
      children: {
        Input: new Input({ ...inputProps, id, className: `${styles.input} ${isError ? styles.isError : ''}`.trim() }),
      },
    })
  }

  render(): string {
    return AuthInputTemplate
  }
}
