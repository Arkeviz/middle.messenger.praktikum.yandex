import { TUser } from '../../types/user.ts'

export const mockUserData: TUser = {
  avatar: '/kad-avatar.jpg',
  displayName: 'Копосов Алексей',

  email: 'pochta@ya.ru',
  login: 'Arkeviz',
  firstName: 'Алексей',
  secondName: 'Копосов',
  phone: '+79004204237',

  isEditProfile: false,
  isEditPassword: false,

  profileFormFields: [
    {
      label: 'Почта',
      value: 'pochta@ya.ru',
      type: 'email',
      name: 'email',
      autocomplete: 'email',
    },
    {
      label: 'Логин',
      value: 'Arkeviz',
      type: 'text',
      name: 'login',
      autocomplete: 'username',
    },
    {
      label: 'Имя',
      value: 'Алексей',
      type: 'text',
      name: 'first_name',
      autocomplete: 'given-name',
    },
    {
      label: 'Фамилия',
      value: 'Копосов',
      type: 'text',
      name: 'second_name',
      autocomplete: 'family-name',
    },
    {
      label: 'Имя в чате',
      value: 'Копосов Алексей',
      type: 'text',
      name: 'display_name',
      autocomplete: 'family-name',
    },
    {
      label: 'Телефон',
      value: '+79004204237',
      type: 'tel',
      name: 'phone',
      autocomplete: 'tel',
    },
  ],
  editPasswordFormFields: [
    {
      label: 'Старый пароль',
      type: 'password',
      name: 'oldPassword',
      autocomplete: 'password',
      placeholder: '••••••••',
    },
    {
      label: 'Новый пароль',
      type: 'password',
      name: 'newPassword',
      autocomplete: 'password',
      placeholder: '••••••••',
    },
    {
      label: 'Повторите новый пароль',
      type: 'password',
      name: 'newPasswordRepeat',
      autocomplete: 'password_repeat',
      placeholder: '••••••••',
    },
  ],
}
