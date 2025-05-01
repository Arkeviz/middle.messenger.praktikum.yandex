import type { TValidationRule } from '../../../types'
import Block from '../../../core/block.ts'
import { DsForm, DsButton, DsInputField } from '../../../components'
import { PAGES } from '../../../constants'
import { RULE_LOGIN, RULE_PASSWORD } from '../../../utils/validationRules.ts'
import {
  handleFieldChange,
  handleFormSubmit,
} from '../../../components/design-system/DsForm/handlers.ts'

type TLoginFormState = Record<
  'login' | 'password',
  {
    value: string
    rules: TValidationRule[]
  }
>

export default class LoginPage extends Block {
  constructor() {
    super('main', {
      title: 'Вход',
      className: 'auth-container',
      formState: {
        login: {
          value: '',
          rules: [RULE_LOGIN],
        },
        password: {
          value: '',
          rules: [RULE_PASSWORD],
        },
      },
      errors: {
        login: '',
        password: '',
      },
      AuthForm: new DsForm({
        title: 'Вход',
        className: 'auth-form login-form',
        headingClass: 'auth-title',
        fields: [
          new DsInputField({
            label: 'Логин',
            type: 'text',
            placeholder: '',
            autocomplete: 'login',
            name: 'login',
            onBlur: (event: Event) =>
              handleFieldChange(
                event,
                'login',
                this.props.formState as TLoginFormState,
                (newState) => this.setProps({ formState: newState }),
                this.children.AuthForm as DsForm,
              ),
          }),
          new DsInputField({
            label: 'Пароль',
            type: 'password',
            placeholder: '',
            name: 'password',
            autocomplete: 'password',
            onBlur: (event: Event) =>
              handleFieldChange(
                event,
                'password',
                this.props.formState as TLoginFormState,
                (newState) => this.setProps({ formState: newState }),
                this.children.AuthForm as DsForm,
              ),
          }),
        ],
        controls: [
          new DsButton({
            content: 'Авторизоваться',
            type: 'primary',
            nativeType: 'submit',
            className: 'ds-button_submit',
          }),
          new DsButton({
            content: 'Нет аккаунта?',
            type: 'link',
            dataPage: PAGES.REGISTER,
          }),
        ],
        onSubmit: (event: Event) =>
          handleFormSubmit(
            event,
            this.props.formState as TLoginFormState,
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
