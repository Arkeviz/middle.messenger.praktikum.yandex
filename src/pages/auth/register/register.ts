import type { TValidationRule } from '../../../types'
import Block from '../../../core/block.ts'
import { PAGES } from '../../../constants'
import { DsForm, DsButton, DsInputField } from '../../../components'
import {
  RULE_EMAIL,
  RULE_FIO,
  RULE_LOGIN,
  RULE_PASSWORD,
  RULE_PHONE,
  RULE_REPEAT_PASSWORD,
} from '../../../utils/validationRules.ts'
import {
  handleFieldChange,
  handleFormSubmit,
} from '../../../components/design-system/DsForm/handlers.ts'

type TRegisterFormState = Record<
  'email' | 'login' | 'first_name' | 'second_name' | 'phone' | 'password',
  {
    value: string
    rules: TValidationRule[]
  }
>

export default class RegisterPage extends Block {
  constructor() {
    super('main', {
      className: 'auth-container',
      formState: {
        email: {
          value: '',
          rules: [RULE_EMAIL],
        },
        login: {
          value: '',
          rules: [RULE_LOGIN],
        },
        first_name: {
          value: '',
          rules: [RULE_FIO],
        },
        second_name: {
          value: '',
          rules: [RULE_FIO],
        },
        phone: {
          value: '',
          rules: [RULE_PHONE],
        },
        password: {
          value: '',
          rules: [RULE_PASSWORD],
        },
        password_repeat: {
          value: '',
          rules: [RULE_REPEAT_PASSWORD],
        },
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        password_repeat: '',
      },
      AuthForm: new DsForm({
        title: 'Регистрация',
        className: 'auth-form register-form',
        headingClass: 'auth-title',
        fields: [
          new DsInputField({
            label: 'Почта',
            type: 'email',
            placeholder: 'pochta@yandex.ru',
            autocomplete: 'email',
            name: 'email',
            onBlur: (event: Event) => {
              handleFieldChange(
                event,
                'email',
                this.props.formState as TRegisterFormState,
                (newState) => this.setProps({ formState: newState }),
                this.children.AuthForm as DsForm,
              )
            },
          }),
          new DsInputField({
            label: 'Логин',
            type: 'text',
            placeholder: 'ivanivanov',
            autocomplete: 'login',
            name: 'login',
            onBlur: (event: Event) => {
              handleFieldChange(
                event,
                'login',
                this.props.formState as TRegisterFormState,
                (newState) => this.setProps({ formState: newState }),
                this.children.AuthForm as DsForm,
              )
            },
          }),
          new DsInputField({
            label: 'Имя',
            type: 'text',
            placeholder: 'Иван',
            autocomplete: 'first_name',
            name: 'first_name',
            onBlur: (event: Event) => {
              handleFieldChange(
                event,
                'first_name',
                this.props.formState as TRegisterFormState,
                (newState) => this.setProps({ formState: newState }),
                this.children.AuthForm as DsForm,
              )
            },
          }),
          new DsInputField({
            label: 'Фамилия',
            type: 'text',
            placeholder: 'Иванов',
            autocomplete: 'second_name',
            name: 'second_name',
            onBlur: (event: Event) => {
              handleFieldChange(
                event,
                'second_name',
                this.props.formState as TRegisterFormState,
                (newState) => this.setProps({ formState: newState }),
                this.children.AuthForm as DsForm,
              )
            },
          }),
          new DsInputField({
            label: 'Телефон',
            type: 'tel',
            placeholder: '+7 (909) 967 30 30',
            autocomplete: 'phone',
            name: 'phone',
            onBlur: (event: Event) => {
              handleFieldChange(
                event,
                'phone',
                this.props.formState as TRegisterFormState,
                (newState) => this.setProps({ formState: newState }),
                this.children.AuthForm as DsForm,
              )
            },
          }),
          new DsInputField({
            label: 'Пароль',
            type: 'password',
            placeholder: '',
            name: 'password',
            autocomplete: 'password',
            onBlur: (event: Event) => {
              handleFieldChange(
                event,
                'password',
                this.props.formState as TRegisterFormState,
                (newState) => this.setProps({ formState: newState }),
                this.children.AuthForm as DsForm,
              )
            },
          }),
          new DsInputField({
            label: 'Пароль (ещё раз)',
            type: 'password',
            placeholder: '',
            name: 'password_repeat',
            autocomplete: 'password_repeat',
            onBlur: (event: Event) => {
              handleFieldChange(
                event,
                'password_repeat',
                this.props.formState as TRegisterFormState,
                (newState) => this.setProps({ formState: newState }),
                this.children.AuthForm as DsForm,
              )
            },
          }),
        ],
        controls: [
          new DsButton({
            content: 'Зарегистрироваться',
            type: 'primary',
            nativeType: 'submit',
            className: 'ds-button_submit',
          }),
          new DsButton({
            content: 'Войти',
            type: 'link',
            dataPage: PAGES.LOGIN,
          }),
        ],
        onSubmit: (event: Event) =>
          handleFormSubmit(
            event,
            this.props.formState as TRegisterFormState,
            (errors) => this.setProps({ errors }),
            this.children.AuthForm as DsForm,
          ),
      }),
    })
  }

  render(): string {
    return `
      {{{AuthForm}}}
    `
  }
}
