import styles from './message.module.scss'

export const Message = `
  <artcicle 
    id="message-{{id}}" 
    class="${styles.message}
    {{#if (isOutgoingMessage message.type)}}
        ${styles.outgoing}
    {{else}}
        ${styles.incoming}
    {{/if}}">
    <p class=${styles.text}>{{message.text}}</p>
    <time class=${styles.time}>{{message.date}}</time>
  </artcicle>
`
