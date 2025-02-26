import styles from './navigation.module.scss'

export const navigationTemplate = `
  <main>
    <h1 class=${styles.title}>Навигация по проекту:</h1>
    
    <nav>
      <ul>
        {{#each Links as |link|}}
          <li>{{{ link }}}</li>
        {{/each}}  
      </ul>    
    </nav>
  </main>
  `
