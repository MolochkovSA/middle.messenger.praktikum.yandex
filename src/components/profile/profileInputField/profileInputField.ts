import { InputField } from '@/components'
import { InputFieldInitProps } from '@/components/common/inputField'
import { Block } from '@/core'

import { profileInputFieldTemplate } from './profileInputField.tmpl'

import styles from './profileInputField.module.scss'

type ProfileInputFieldChildren = {
  InputField: InputField
}

export class ProfileInputField extends Block<InputFieldInitProps, {}, ProfileInputFieldChildren> {
  constructor({ className, ...rest }: InputFieldInitProps) {
    super({
      children: {
        InputField: new InputField({ ...rest, className: `${styles.profileInput} ${className ?? ''}`.trim() }),
      },
    })
  }

  render(): string {
    return profileInputFieldTemplate
  }
}
