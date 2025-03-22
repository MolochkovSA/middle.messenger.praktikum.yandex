import { InputField } from '@/components'
import { InputFieldProps } from '@/components/common/inputField'

import styles from './authInputField.module.scss'

export class AuthInputField extends InputField {
  constructor(props: InputFieldProps) {
    super({
      ...props,
      className: `${styles.input} ${props.className ?? ''}`.trim(),
    })
  }
}
