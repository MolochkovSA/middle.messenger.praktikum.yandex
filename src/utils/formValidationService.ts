export class FormValidationService {
  listeners: Record<string, (errorMessage: string) => void>

  constructor() {
    this.listeners = {}
  }

  isName(name: string): boolean {
    const re = /^[A-ZА-ЯЁ][a-zа-яё-]*$/
    return re.test(name)
  }

  isLogin(login: string): boolean {
    const re = /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/
    return re.test(login)
  }

  isEmail(email: string): boolean {
    const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  isPassword(password: string): boolean {
    const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,40}$/
    return re.test(password)
  }

  isPhone(phone: string): boolean {
    const re = /^\+?\d{10,15}$/
    return re.test(phone)
  }

  isMessage(message: string): boolean {
    return message.length > 0
  }

  log(element: HTMLElement): void {
    const form = element.querySelectorAll('form')

    form.forEach((form) => {
      const inputs = form.querySelectorAll('input')
      const submitButton = form.querySelector('[type=submit]')

      inputs.forEach((input) => {
        input.addEventListener('blur', () => {
          this.listeners[input.id](input.value)
        })
      })

      form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('submit')
      })
    })
  }

  errorEventOn(event: string, listener: (errorMessage: string) => void) {
    this.listeners[event] = listener
  }
}
