import styles from './ProfilePassword.module.scss'

export type ProfilePasswordProps = {
  oldPassword: string
  newPassword: string
  newPasswordRepeat: string
}

export const ProfilePassword = `
  {{#> ProfileLayout}}
    <form class=${styles.form}>
      {{> ProfileInput id="oldPassword" type="password" name="oldPassword" label="Старый пароль" value=oldPassword}}
      {{> ProfileInput id="newPassword" type="password" name="newPassword" label="Новый пароль" value=newPassword}}
      {{> ProfileInput id="newPasswordRepeat" type="password" name="newPasswordRepeat" label="Повторите новый пароль" value=newPasswordRepeat}}

      {{#> Button id=buttonId type="submit" className="${styles.submit}"}}
        <span>Сохранить</span>
      {{/ Button}} 
    </form>   
  {{/ ProfileLayout}}
`
