import styles from './errorMessage.module.scss'

export type ErrorMessageProps = {
  message: string
  className?: string
}

export const ErrorMessage = `
  <p class="${styles.error} {{className}}">{{message}}</p>
`
