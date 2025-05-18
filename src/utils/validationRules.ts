import { TFormField, TValidationRule } from '../types'

export const RULE_REQUIRED: TValidationRule = {
  message: 'Это обязательное поле',
  validator: (value) => !!value,
}

export const RULE_REQUIRED_FILE: TValidationRule = {
  message: 'Нужно выбрать файл',
  validator: (_, __, input) => input.files?.[0] != null,
}

export const RULE_EMAIL: TValidationRule = {
  message: 'Некорректный email',
  validator: (value) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  },
}

export const RULE_LOGIN: TValidationRule = {
  message:
    'Неверный логин: длина от 3 до 20, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  validator: (value) => {
    return /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/.test(value)
  },
}

export const RULE_PASSWORD: TValidationRule = {
  message:
    'Пароль должен состоять из 8-40 символов, а так же иметь хотя бы одну заглавную букву и цифру',
  validator: (value) => {
    return /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d).{8,40}$/.test(value)
  },
}

type TFormStateWithPasswords = {
  [key in 'password' | 'password_repeat' | string]: TFormField
}
export const RULE_PASSWORD_REPEAT: TValidationRule = {
  message: 'Пароли не совпадают',
  validator: (value, formState: TFormStateWithPasswords) => {
    return (
      value === (formState?.password?.value ?? formState?.newPassword?.value)
    )
  },
}

/** Правило валидации полей ФИО */
export const RULE_FIO: TValidationRule = {
  message:
    'Разрешены только буквы кириллицы или латиницы, первая буква — заглавная, допускается дефис, без пробелов и цифр',
  validator: (value) => {
    return /^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ-]*$/.test(value)
  },
}

export const RULE_PHONE: TValidationRule = {
  message:
    'Телефон должен содержать только цифры, может начинаться с +, длина от 10 до 15 символов',
  validator: (value) => {
    return /^\+?\d{10,15}$/.test(value)
  },
}
