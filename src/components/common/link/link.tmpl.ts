import styles from './link.module.scss'

export type LinkProps = {
  path: string
  className?: string
}

export const Link = `
<a href="#" data-page="{{data-page}}" class="${styles.link} {{className}}">
  {{#if @partial-block}}
    {{> @partial-block}}
  {{/if}}
  {{{ test}}}
</a>
`
