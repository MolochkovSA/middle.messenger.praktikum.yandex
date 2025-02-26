import styles from './authInput.module.scss'

export const AuthInputTemplate = `
  {{{ Input }}}
  
  {{#if label}}
    <label for={{id}} class="${styles.label}">{{label}}</label>
  {{/if}} 

  {{#if errorMessage}}
    <p class="${styles.error}">{{errorMessage}}</p>
  {{/if}}  
  `
