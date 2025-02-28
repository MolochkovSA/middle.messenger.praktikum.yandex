import styles from './avatarButton.module.scss'

export const avatarButtonTemplate = `{{{ Button }}}`

export const getButtonLabel = (avatarSrc: string) => `
  <img src=${avatarSrc} class=${styles.avatar} alt="avatar">

  <div class=${styles.mask}>
    <span>
      Поменять аватар
    </span>
  </div>  
`
