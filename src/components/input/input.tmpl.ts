import styles from './input.module.scss'

export type InputProps = {
  id: string
  type: 'text' | 'password' | 'email' | 'number' | 'tel'
  name: string
  placeholder: string
  value: string
  className?: string
  error?: boolean
}

export const Input = `
  <input 
    id={{id}} 
    type={{type}} 
    name={{name}} 
    class="{{className}} {{#if error}}${styles.error}{{/if}}" 
    placeholder={{placeholder}} 
    value={{value}}>
`
