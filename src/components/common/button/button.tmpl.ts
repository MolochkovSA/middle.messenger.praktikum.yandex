import styles from './button.module.scss'

export type ButtonProps = {
  id: string
  type?: 'submit'
  disabled?: boolean
  className?: string
}

export const Button = `
<button 
  id="{{id}}"
  class="${styles.button} {{className}}"
  
  {{#if type}}
    type="{{type}}"
  {{else}}
    type="button"
  {{/if}}

  {{#if disabled}}
    disabled
  {{/if}}>
    {{> @partial-block}}
</button>
`
