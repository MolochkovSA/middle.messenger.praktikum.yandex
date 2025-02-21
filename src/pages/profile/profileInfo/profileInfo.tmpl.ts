import styles from './profileInfo.module.scss'

export type ProfileInfoProps = {
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}

export const ProfileInfo = `
  {{#> ProfileLayout}}
    <h2 class=${styles.title}>{{display_name}}</h2>

    <form class=${styles.form}>
      {{> ProfileInput id="email" type="email" name="email" label="Почта" value=email disabled=true}}
      {{> ProfileInput id="login" type="text" name="login" label="Логин" value=login disabled=true}}
      {{> ProfileInput id="first_name" type="text" name="first_name" label="Имя" value=first_name disabled=true}}
      {{> ProfileInput id="second_name" type="text" name="second_name" label="Фамилия" value=second_name disabled=true}}

      {{> ProfileInput 
       id="display_name" 
       type="text" 
       name="display_name" 
       label="Имя в чате" 
       value=display_name 
       disabled=true
      }}

      {{> ProfileInput id="phone" type="text" name="phone" label="Телефон" value=phone disabled=true}}
    </form>

    {{#> Link className="${styles.link}" data-page="/profile/edit"}} 
      <span>Изменить данные</span>
    {{/ Link}}

    {{#> Link className="${styles.link}" data-page="/profile/password"}} 
      <span>Изменить пароль</span>
    {{/ Link}}

    {{#> Link className="${styles.link}" data-page="/login"}} 
      <span>Выйти</span>
    {{/ Link}}
    
  {{/ ProfileLayout}}
`
