export type ValidationSchemaName =
  | 'name'
  | 'optionalName'
  | 'login'
  | 'email'
  | 'password'
  | 'equalPassword'
  | 'phone'
  | 'message'

type ValidationTest = (args: { value: string; minLength?: number; maxLength?: number }) => string

type ValidationSchemas = Record<
  ValidationSchemaName,
  { minLength?: number; maxLength?: number; tests: ValidationTest[] }
>

export class InputValidationService {
  static checkValue(schemaName: ValidationSchemaName, value: string): string {
    const { tests, minLength, maxLength } = this.schemas[schemaName]

    let result = ''

    tests.find((test) => {
      const errorMessage = test({ value, minLength, maxLength })
      if (errorMessage.length) {
        result = errorMessage
        return true
      }

      return false
    })

    return result
  }

  static checkEqualPasswords(passwordValues: string[]): string {
    return new Set(passwordValues).size === 1 ? '' : 'Пароли должны совпадать'
  }

  private static requireValueTest: ValidationTest = ({ value }): string => {
    return value.length ? '' : 'Не должно быть пустым'
  }

  private static minLengthTest: ValidationTest = ({ value, minLength = 3 }): string => {
    return value.length >= minLength ? '' : `Должно быть не менее ${minLength} символов`
  }

  private static maxLengthTest: ValidationTest = ({ value, maxLength = 20 }): string => {
    return value.length <= maxLength ? '' : `Должно быть не более ${maxLength} символов`
  }

  private static isNameTest: ValidationTest = ({ value }): string => {
    return /^[A-ZА-ЯЁ][a-zа-яё-]*$|^$/.test(value)
      ? ''
      : 'Допустима латиница, кириллица и дефис, первая буква должна быть заглавной'
  }

  private static isLoginTest: ValidationTest = ({ value }): string => {
    return /^(?=.*[A-Za-z])[A-Za-z0-9-_]*$/.test(value)
      ? ''
      : 'Должна быть латиница, допустимы цифры, дефис и нижнее подчёркивание'
  }

  private static isEmailTest: ValidationTest = ({ value }): string => {
    return /^[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[a-z]+$/.test(value) ? '' : 'Некорректная почта'
  }

  private static isPasswordTest: ValidationTest = ({ value }): string => {
    return /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!?@$*%&]+$/.test(value)
      ? ''
      : 'Должна быть хотя бы одна заглавная буква и цифра'
  }

  private static isPhoneTest: ValidationTest = ({ value }): string => {
    return /^\+?[0-9]+$/.test(value) ? '' : 'Некорректный номер телефона'
  }

  private static schemas: ValidationSchemas = {
    name: { tests: [this.requireValueTest, this.isNameTest] },
    optionalName: { tests: [this.isNameTest] },
    login: {
      minLength: 3,
      maxLength: 20,
      tests: [this.requireValueTest, this.minLengthTest, this.maxLengthTest, this.isLoginTest],
    },
    email: { tests: [this.requireValueTest, this.isEmailTest] },
    password: {
      minLength: 8,
      maxLength: 40,
      tests: [this.requireValueTest, this.minLengthTest, this.maxLengthTest, this.isPasswordTest],
    },
    equalPassword: {
      minLength: 8,
      maxLength: 40,
      tests: [this.requireValueTest, this.minLengthTest, this.maxLengthTest, this.isPasswordTest],
    },
    phone: {
      minLength: 10,
      maxLength: 15,
      tests: [this.requireValueTest, this.minLengthTest, this.maxLengthTest, this.isPhoneTest],
    },
    message: { tests: [this.requireValueTest] },
  }
}
