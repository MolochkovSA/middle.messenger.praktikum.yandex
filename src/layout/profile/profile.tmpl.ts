import arrowBtn from '../../../static/arrowBtn.svg'
import defaultAvatar from '../../../static/avatar.png'

import styles from './profile.module.scss'

export const ProfileLayout = `
  <main class=${styles.profileLayout}>
    {{#> Link className="${styles.link}" data-page="/chat"}}
      <img src=${arrowBtn} class=${styles.icon} alt="chevronLeft">
    {{/ Link}}

    <div class=${styles.content}>
      <h1 class=${styles.title}>Profile</h1>

      {{#> Button id="editAvatarButton" className="${styles.button}"}}
        <img src=${defaultAvatar} class=${styles.avatar} alt="avatar">
        
        <div class=${styles.mask}>
          <span>
            Поменять аватар
          </span>
        </div>  
      {{/ Button}}

      {{> @partial-block}}      
    </div>
  </main>
`
