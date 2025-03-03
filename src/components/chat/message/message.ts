import { Block } from '@/core'
import { MessageType } from '@/pages/chat/types'

import styles from './message.module.scss'

type MessageItemProps = {
  date: string
  type: MessageType
  image?: string
  text?: string
}

export class MessageItem extends Block<MessageItemProps> {
  constructor(props: MessageItemProps) {
    super({
      props,
    })
  }

  render(): string {
    const isOutgoingMessage = this.getProps().type === MessageType.Outgoing
    return ` 
      <div class="${styles.message} ${isOutgoingMessage ? styles.outgoing : styles.incoming}">  
        {{#if image}}
            <artcicle class=${styles.imageMessage}>
              <div class=${styles.imageWrapper}>
                <img src="{{image}}"/>
                <time>{{date}}</time>
              </div>          
            </artcicle>    
        {{/if}}        

        {{#if text}}
            <artcicle class=${styles.textMessage}>
              <p>{{text}}<time>{{date}}</time></p>   
            </artcicle>  
        {{/if}}  
      </div>         
    `
  }
}
