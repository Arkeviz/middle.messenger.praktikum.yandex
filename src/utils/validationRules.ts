import { TFormField, TValidationRule } from '../types'

export const RULE_REQUIRED: TValidationRule = {
  message: 'Это обязательное поле',
  validator: (_, value) => !!value,
}

export const RULE_EMAIL: TValidationRule = {
  message: 'Некорректный email',
  validator: (_, value) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  },
}

export const RULE_LOGIN: TValidationRule = {
  message:
    'Неверный логин: длина от 3 до 20, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  validator: (_, value) => {
    return /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/.test(value)
  },
}

export const RULE_PASSWORD: TValidationRule = {
  message:
    'Пароль должен состоять из 8-40 символов, а так же иметь хотя бы одну заглавную букву и цифру',
  validator: (_, value) => {
    return /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d).{8,40}$/.test(value)
  },
}

type TFormStateWithPasswords = {
  [key in 'password' | 'password_repeat' | string]: TFormField
}
export const RULE_REPEAT_PASSWORD: TValidationRule = {
  message: 'Пароли не совпадают',
  validator: (formState: TFormStateWithPasswords, value) => {
    return value === formState?.password?.value
  },
}

/** Правило валидации полей ФИО */
export const RULE_FIO: TValidationRule = {
  message:
    'Разрешены только буквы кириллицы или латиницы, первая буква — заглавная, допускается дефис, без пробелов и цифр',
  validator: (_, value) => {
    return /^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ-]*$/.test(value)
  },
}

export const RULE_PHONE: TValidationRule = {
  message:
    'Телефон должен содержать только цифры, может начинаться с +, длина от 10 до 15 символов',
  validator: (_, value) => {
    return /^\+?\d{10,15}$/.test(value)
  },
}
