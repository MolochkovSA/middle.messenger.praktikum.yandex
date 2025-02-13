import styles from './profileEdit.module.scss'

export type ProfileEditProps = {
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}

export const ProfileEdit = `
  {{#> ProfileLayout}}
    <form class=${styles.form}>
      {{> ProfileInput id="email" type="email" name="email" label="Почта" value=email}}
      {{> ProfileInput id="login" type="text" name="login" label="Логин" value=login}}
      {{> ProfileInput id="first_name" type="text" name="first_name" label="Имя" value=first_name}}
      {{> ProfileInput id="second_name" type="text" name="second_name" label="Фамилия" value=second_name}}
      {{> ProfileInput id="display_name" type="text" name="display_name" label="Имя в чате" value=display_name}}
      {{> ProfileInput id="phone" type="text" name="phone" label="Телефон" value=phone}}

      {{#> Button id=buttonId type="submit" className="${styles.submit}"}}
        <span>Сохранить</span>
      {{/ Button}} 
    </form>   
  {{/ ProfileLayout}}
`
