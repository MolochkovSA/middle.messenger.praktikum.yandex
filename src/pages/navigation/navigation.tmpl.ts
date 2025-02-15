import styles from './navigation.module.scss'

export const Navigation = `
  <main>
    <h1 class=${styles.title}>Навигация по проекту:</h1>
    
    <nav>
      <ul>
        <li>{{#> Link className="${styles.link}" data-page="/login"}}Страница авторизации{{/ Link}}</li>
        <li>{{#> Link className="${styles.link}" data-page="/register"}}Страница регистрации{{/ Link}}</li>
        <li>{{#> Link className="${styles.link}" data-page="/chat"}}Страница чата{{/ Link}}</li>
        <li>{{#> Link className="${styles.link}" data-page="/profile"}}Страница просмотра профиля{{/ Link}}</li>
        <li>{{#> Link className="${styles.link}" data-page="/profile/edit"}}Страница редактирования профиля{{/ Link}}</li>
        <li>{{#> Link className="${styles.link}" data-page="/profile/password"}}Страница изменения пароля{{/ Link}}</li>
        <li>{{#> Link className="${styles.link}" data-page="/not-found"}}Страница ошибки 404{{/ Link}}</li>
        <li>{{#> Link className="${styles.link}" data-page="/server-error"}}Страница ошибки 500{{/ Link}}</li>
      </ul>    
    </nav>
  </main>
  `
