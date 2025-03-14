import { InputField } from '@/components'
import { InputFieldProps } from '@/components/common/inputField'
import { Block } from '@/core'

import styles from './authInputField.module.scss'

type AuthInputFieldChildren = {
  InputField: InputField
}

export class AuthInputField extends Block<InputFieldProps, {}, AuthInputFieldChildren> {
  constructor({ className, ...rest }: InputFieldProps) {
    super({
      children: {
        InputField: new InputField({ ...rest, className: `${styles.input} ${className ?? ''}`.trim() }),
      },
    })
  }

  render(): string {
    const props = this.getProps()
    const { InputField } = this.getChildren()

    InputField.setProps(props)

    return `{{{ InputField }}}`
  }
}
