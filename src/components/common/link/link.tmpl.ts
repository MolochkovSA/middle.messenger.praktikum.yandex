import styles from './link.module.scss'

export const linkTemplate = `
  <a href="#" data-page="{{data-page}}" class="${styles.link} {{className}}">
    {{{ label }}}
  </a>
  `
