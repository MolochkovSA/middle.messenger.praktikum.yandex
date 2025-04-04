import { Block } from '@/core'

export type InputProps = {
  id: string
  type: HTMLInputElement['type']
  name?: string
  placeholder?: string
  value?: string
  disabled?: boolean
  className?: string
}

export type InputEvents = {
  input?: (e: Event) => void
  change?: (e: Event) => void
  focus?: (e: Event) => void
  blur?: (e: Event) => void
}

export class Input extends Block<InputProps, InputEvents> {
  constructor({ input, change, focus, blur, ...props }: InputProps & InputEvents) {
    super({
      props,
      events: {
        input,
        change,
        focus,
        blur,
      },
    })
  }

  render() {
    return `
      <input 
        id="{{id}}" 
        type="{{type}}" 
        name="{{name}}" 
        class="{{className}}" 
        placeholder="{{placeholder}}" 
        value="{{value}}"
        ${this.getProps().type === 'file' ? "accept='image/*'" : ''}

        {{#if validator}}
          data-validator="{{validator}}"
        {{/if}}

        {{#if disabled}}
          disabled
        {{/if}}
      />
    `
  }
}
