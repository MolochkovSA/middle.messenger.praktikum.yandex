export type UserId = number

export type User = {
  id: UserId
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
  email: string
}

export type UserUpdateDTO = Pick<User, 'first_name' | 'second_name' | 'display_name' | 'phone' | 'email' | 'login'>

export type SignInDto = Pick<User, 'login'> & { password: string }

export type SinUpDto = Omit<User, 'id' | 'avatar' | 'display_name'> & { password: string }

export type ResetPasswordDto = {
  oldPassword: string
  newPassword: string
}
