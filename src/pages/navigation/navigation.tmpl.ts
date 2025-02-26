import styles from './navigation.module.scss'

export const navigationTemplate = `
    <h1 class=${styles.title}>Навигация по проекту:</h1>
    
    <nav>
      <ul>
        {{#each Links as |link|}}
          {{{ link }}}
        {{/each}}  
      </ul>    
    </nav>
  `
