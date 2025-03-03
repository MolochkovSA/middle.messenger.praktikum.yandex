import { Block } from '@/core'

import styles from './button.module.scss'

type ButtonProps = {
  type?: HTMLButtonElement['type']
  label: string | HTMLElement
  disabled?: boolean
  className?: string
}

type ButtonEvents = {
  click?: (e: Event) => void
}

export class Button extends Block<ButtonProps, ButtonEvents> {
  constructor({ click, type = 'button', ...props }: ButtonProps & ButtonEvents) {
    super({
      props: {
        ...props,
        type,
      },
      events: {
        click,
      },
    })
  }

  render() {
    return `
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
  }
}
