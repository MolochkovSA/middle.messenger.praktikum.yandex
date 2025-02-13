import { InputProps } from '../../common/input'

import styles from './profileInput.module.scss'

export type ProfileInputProps = {
  id: string
  type: InputProps['type']
  name: string
  label: string
  value: string
  disabled?: boolean
}

export const ProfileInput = `
<div class=${styles.profileInput}>
  {{> Label htmlFor=id text=label className="${styles.label}"}}
  {{> Input 
   id=id 
   type=type 
   name=name 
   placeholder=label 
   className="${styles.input}" 
   value=value 
   disabled=disabled}}
</div>
`
