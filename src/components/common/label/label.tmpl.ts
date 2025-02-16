export type LabelProps = {
  htmlFor: string
  text: string
  className?: string
}

export const Label = `
  <label for="{{htmlFor}}" class="{{className}}">{{text}}</label>
`
