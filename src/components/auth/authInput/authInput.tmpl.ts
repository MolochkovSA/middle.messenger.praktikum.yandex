import styles from './authInput.module.scss'

export const AuthInputTemplate = `
  <div class="${styles.authInput} {{#if isError}}${styles.isError}{{/if}}">
    {{{ Input }}}
    
    {{#if label}}
      <label for={{id}} class="${styles.label}">{{label}}</label>
    {{/if}} 

    {{#if errorMessage}}
      <p class="${styles.errorMessage}">{{errorMessage}}</p>
    {{/if}}  
  </div>
  `
