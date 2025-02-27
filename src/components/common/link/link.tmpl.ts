import styles from './link.module.scss'

export const linkTemplate = `
  <a href="#" data-page="{{to}}" class="${styles.link} {{className}}">
    {{{ label }}}
  </a>
  `
