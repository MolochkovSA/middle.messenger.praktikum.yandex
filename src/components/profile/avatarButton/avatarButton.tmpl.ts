import styles from './avatarButton.module.scss'

export const avatarButtonTemplate = `{{{ Button }}}`

export const getButtonLabel = (avatarSrc: string, disabled?: boolean) => `
  <img src=${avatarSrc} class=${styles.avatar} alt="avatar">

${
  disabled
    ? ''
    : `<div class=${styles.mask}>
      <span>
        Поменять аватар
      </span>
    </div>`
}
`
