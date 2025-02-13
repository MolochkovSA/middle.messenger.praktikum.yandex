import styles from './button.module.scss'

export type ButtonProps = {
  id: string
  type: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export const Button = `
<button 
  id="{{id}}"
  class="${styles.button} {{className}}" 
  type="{{type}}"
  {{#if disabled}}
    disabled
  {{/if}}>
    {{> @partial-block}}
</button>
`
