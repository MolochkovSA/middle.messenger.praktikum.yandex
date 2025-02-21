import { AuthInputProps } from '../../../components'

import styles from './register.module.scss'

type InputProps = Pick<AuthInputProps, 'value' | 'isError' | 'errorMessage'>

export type RegisterProps = {
  email: InputProps
  login: InputProps
  first_name: InputProps
  second_name: InputProps
  phone: InputProps
  password: InputProps
  password_repeat: InputProps
}

export const Register = `
  {{#> AuthLayout title="Регистрация" buttonLabel="Зарегистрироваться" linkLabel="Войти" linkTo="/login"}}
    {{> AuthInput 
     id="emailInput" 
     type="email" 
     name="email" 
     label="Почта" 
     isError=email.isError 
     errorMessage=email.errorMessage 
     value=email.value
    }}

    {{> AuthInput 
     id="loginInput" 
     type="text" 
     name="login" 
     label="Логин" 
     isError=login.isError 
     errorMessage=login.errorMessage 
     value=login.value
    }}

    {{> AuthInput 
     id="firstNameInput" 
     type="text" 
     name="first_name" 
     label="Имя" 
     isError=first_name.isError 
     errorMessage=first_name.errorMessage 
     value=first_name.value
    }}

    {{> AuthInput 
     id="secondNameInput" 
     type="text" 
     name="second_name" 
     label="Фамилия" 
     isError=second_name.isError 
     errorMessage=second_name.errorMessage 
     value=second_name.value
    }}

    {{> AuthInput 
     id="phoneInput" 
     type="tel" 
     name="phone" 
     label="Телефон" 
     isError=phone.isError 
     errorMessage=phone.errorMessage 
     value=phone.value
    }}

    {{> AuthInput 
     id="passwordInput" 
     type="password" 
     name="password" 
     label="Пароль" 
     isError=password.isError 
     errorMessage=password.errorMessage 
     value=password.value
    }}

    {{> AuthInput 
     id="passwordRepeatInput" 
     type="password" 
     name="password_repeat" 
     label="Повтор пароля" 
     isError=password_repeat.isError 
     errorMessage=password_repeat.errorMessage 
     value=password_repeat.value
    }}
  
  
    {{#> Button id=buttonId type="submit" className="${styles.button}"}}
      {{buttonLabel}}
    {{/ Button}}

    {{#> Link className="${styles.link}" data-page=linkTo}}
      {{linkLabel}}
    {{/ Link}}
  
    {{/ AuthLayout}}
`
