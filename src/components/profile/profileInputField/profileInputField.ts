import { InputField } from '@/components'
import { InputFieldProps } from '@/components/common/inputField'

import styles from './profileInputField.module.scss'

export class ProfileInputField extends InputField {
  constructor(props: InputFieldProps) {
    super({
      ...props,
      className: `${styles.input} ${props.className ?? ''}`.trim(),
    })
  }
}
