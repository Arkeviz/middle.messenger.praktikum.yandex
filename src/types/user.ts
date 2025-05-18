export type TUserField = {
  label: string
  value?: string
  type: string
  name: string
  autocomplete?: string
  placeholder?: string
}

export type TUser = {
  avatar?: string
  email: string
  login: string
  firstName: string
  secondName: string
  displayName: string
  phone: string

  isEditProfile: boolean
  isEditPassword: boolean

  profileFormFields: TUserField[]
  editPasswordFormFields: TUserField[]
}
