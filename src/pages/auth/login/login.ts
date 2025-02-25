import { Block } from '@/core'
import { Login } from './login.tmpl'
import { AuthInputProps } from '@/components'

import { Input } from '@/components/common/input/input'

type InputProps = Pick<AuthInputProps, 'value' | 'errorMessage'>

type LoginPageState = {
  login: InputProps
  password: InputProps
}

export class LoginPage extends Block {
  private _state: LoginPageState

  constructor() {
    const defaultState: LoginPageState = {
      login: { value: 'ivanivanov123', errorMessage: 'Неверный логин' },
      password: {},
    }
    super({
      tagName: 'div',
      props: {
        ...defaultState,
      },
      children: {
        TestInput: new Input({
          value: 'ivanivanov123',
          name: 'text',
          type: 'text',
          placeholder: 'Пароль',
          disabled: false,
          onChange: (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
              console.log(e.target.value)
            }
          },
        }),
      },
    })

    this._state = defaultState
  }

  render(): string {
    return Login
  }
}
