import { InputField } from '@/components'
import { InputFieldInitProps } from '@/components/common/inputField'
import { Block } from '@/core'

import { authInputFieldTemplate } from './authInputField.tmpl'

import styles from './authInputField.module.scss'

type AuthInputFieldChildren = {
  InputField: InputField
}

export class AuthInputField extends Block<InputFieldInitProps, {}, AuthInputFieldChildren> {
  constructor({ className, ...rest }: InputFieldInitProps) {
    super({
      children: {
        InputField: new InputField({ ...rest, className: `${styles.input} ${className ?? ''}`.trim() }),
      },
    })
  }

  render(): string {
    return authInputFieldTemplate
  }
}
