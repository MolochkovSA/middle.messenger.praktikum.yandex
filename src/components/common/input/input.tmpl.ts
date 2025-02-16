import styles from './input.module.scss'

export type InputProps = {
  id: string
  type: 'text' | 'password' | 'email' | 'number' | 'tel'
  name: string
  placeholder: string
  value: string
  className?: string
  isError?: boolean
  disabled?: boolean
}

export const Input = `
  <input 
    id="{{id}}" 
    type="{{type}}" 
    name="{{name}}" 
    class="{{className}} {{#if isError}}${styles.error}{{/if}}" 
    placeholder="{{placeholder}}" 
    value="{{value}}" 
    {{#if disabled}}
      disabled
    {{/if}}
  />
`
