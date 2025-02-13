import { InputProps } from '../input'

import styles from './authInput.module.scss'

export type AuthInputProps = {
  id: string
  type: InputProps['type']
  name: string
  label: string
  isError?: boolean
  errorMessage?: string
  value?: string
}

export const AuthInput = `
<div class="${styles.authInput}">
  {{#if value}}
    {{> Label htmlFor=id text=label className="${styles.label}"}}
  {{/if}}    
  
  {{> Input id=id type=type name=name placeholder=label className="${styles.input}" value=value error=isError}}

  {{#if errorMessage}}
    {{> ErrorMessage message=errorMessage}}
  {{/if}}    
</div>
`
