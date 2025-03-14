import { InputField } from '@/components'
import { InputFieldProps } from '@/components/common/inputField'
import { Block } from '@/core'

import styles from './profileInputField.module.scss'

type ProfileInputFieldChildren = {
  InputField: InputField
}

export class ProfileInputField extends Block<InputFieldProps, {}, ProfileInputFieldChildren> {
  constructor({ className, ...rest }: InputFieldProps) {
    super({
      children: {
        InputField: new InputField({ ...rest, className: `${styles.profileInput} ${className ?? ''}`.trim() }),
      },
    })
  }

  render(): string {
    return `{{{ InputField }}}`
  }
}
