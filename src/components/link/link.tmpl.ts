import styles from './link.module.scss'

export type LinkProps = {
  id: string
  path: string
  text: string
  className?: string
}

export const Link = `
<a id={{id}} href={{path}} class="${styles.link} {{className}}">
 {{text}}
</a>
`
