import styles from './authInput.module.scss'

export const AuthInputTemplate = `
  <div class="${styles.authInput}">
    {{{ Input }}}
    
    {{#if label}}
      <label for={{id}} class="${styles.label} {{#if isError}}${styles.isError}{{/if}}">{{label}}</label>
    {{/if}} 

    {{#if errorMessage}}
      <p class="${styles.errorMessage}">{{errorMessage}}</p>
    {{/if}}  
  </div>
  `
