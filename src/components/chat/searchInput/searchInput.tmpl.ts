import searchIcon from '@/assets/search.svg'

import styles from './searchInput.module.scss'

export type SearchInputProps = {
  id: string
  value: string
  className?: string
}

export const SearchInput = `
  <div class="${styles.searchInput} {{className}}">
    {{> Input id=id type="text" name="search" placeholder="Поиск" className="${styles.input}" value=value}}
    {{#unless value}}
      <img src=${searchIcon} class=${styles.icon} alt="search"/>
    {{/unless}}
  </div>
`
