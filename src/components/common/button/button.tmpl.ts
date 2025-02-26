import styles from './button.module.scss'

export const buttonTemplate = `
  <button 
    class="${styles.button} {{className}}"
    
    {{#if type}}
      type="{{type}}"
    {{else}}
      type="button"
    {{/if}}

    {{#if disabled}}
      disabled
    {{/if}}>

      {{{ label }}}
      
  </button>
  `
