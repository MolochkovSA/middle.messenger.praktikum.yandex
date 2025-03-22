import { Block } from '@/core'

import styles from './loader.module.scss'

type LoaderProps = {
  size?: number
  className?: string
}

export class Loader extends Block<LoaderProps> {
  constructor({ size = 48, className = '' }: LoaderProps = {}) {
    super({
      props: {
        size,
        className,
      },
    })
  }

  render(): string {
    return `
      <div class="${styles.container} {{className}}">
        <span class="${styles.loader}"></span>
      </div>
     `
  }
}
