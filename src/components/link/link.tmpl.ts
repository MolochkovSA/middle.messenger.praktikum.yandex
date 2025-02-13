import styles from './link.module.scss'

export type LinkProps = {
  id: string
  path: string
  text: string
  className?: string
}

export const Link = `
<a href="#" data-page="{{data-page}}" class="${styles.link} {{className}}">
  {{text}}
  {{#if @partial-block}}
    {{> @partial-block}}
  {{/if}}
</a>
`
