import { Block } from '@/core'

import styles from './message.module.scss'

type MessageItemProps = {
  time: string
  isMyMessage: boolean
  content: string
  is_read: boolean
  image?: string
  date?: string
}

export class MessageItem extends Block<MessageItemProps> {
  constructor(props: MessageItemProps) {
    super({
      props,
    })
  }

  render(): string {
    const { isMyMessage } = this.getProps()

    return ` 
    <li class=${styles.container}>
      {{#if date}}
        <span class=${styles.date}>{{date}}</span>
      {{/if}}  

      <artcicle class="${styles.message} ${isMyMessage ? styles.outgoing : styles.incoming}">
        {{#if image}}
          <div class=${styles.imageMessage}>       
            <img src="{{image}}" class=${styles.image} alt="message with image"/>
            <time data-is-readed="{{is_read}}">{{time}}</time>           
          </div>    
        {{/if}}        

        {{#if content}}
          <div class=${styles.textMessage}>
            {{content}}
            <time data-is-readed="{{is_read}}">{{time}}</time>
          </div>  
        {{/if}}  
      </artcicle>  
    </li><>       
    `
  }
}
