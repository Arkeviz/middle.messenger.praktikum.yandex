import Block from '../../core/block.ts'
import {
  RULE_EMAIL,
  RULE_FIO,
  RULE_LOGIN,
  RULE_PASSWORD,
  RULE_PASSWORD_REPEAT,
  RULE_PHONE,
  RULE_REQUIRED,
} from '../../utils/validationRules.ts'
import { DsButton, DsForm, DsIcon, ProfileInput } from '../../components'
import { PAGES } from '../../constants'
import {
  handleFieldChange,
  handleFormSubmit,
} from '../../components/design-system/DsForm/handlers.ts'
import type { TValidationRule } from '../../types'
import { TUser } from '../../types/user.ts'
import { mockUserData } from './mockUser.ts'
import { navigate } from '../../main.ts'

type TChangeProfileFormState = Record<
  'email' | 'login' | 'first_name' | 'second_name' | 'display_name' | 'phone',
  {
    value: string
    rules: TValidationRule[]
  }
>

type TChangePasswordFormState = Record<
  'oldPassword' | 'newPassword' | 'newPasswordRepeat',
  {
    value: string
    rules: TValidationRule[]
  }
>

export default class ProfilePage extends Block {
  constructor() {
    const formsRules: Record<string, TValidationRule[]> = {
      email: [RULE_EMAIL],
      login: [RULE_LOGIN],
      first_name: [RULE_FIO],
      second_name: [RULE_FIO],
      display_name: [RULE_REQUIRED],
      phone: [RULE_PHONE],

      oldPassword: [RULE_REQUIRED],
      newPassword: [RULE_PASSWORD],
      newPasswordRepeat: [RULE_PASSWORD_REPEAT],
    }

    const profileFormState: Record<
      string,
      { value: string; rules: TValidationRule[] }
    > = {}
    const profileErrors: Record<string, string> = {}

    // Заполняем стейт и ошибки формы изменения данных профиля
    mockUserData.profileFormFields.forEach((field) => {
      profileFormState[field.name] = {
        value: field.value ?? '',
        rules: formsRules[field.name] ?? [],
      }

      profileErrors[field.name] = ''
    })

    const changeProfileForm = new DsForm({
      className: 'profile-change__data',
      fields: mockUserData.profileFormFields.map(
        (field) =>
          new ProfileInput({
            label: field.label,
            type: field.type,
            placeholder: field.placeholder ?? field.value ?? '',
            value: field.value ?? '',
            autocomplete: field.autocomplete,
            name: field.name,
            onBlur: (event: Event) => {
              handleFieldChange(
                event,
                field.name,
                this.props.profileFormState as TChangeProfileFormState,
                (newState) => this.setProps({ profileFormState: newState }),
                this.children.changeProfileForm as DsForm,
              )
            },
          }),
      ),
      controls: [
        new DsButton({
          className: 'profile-change__save-button',
          content: 'Сохранить',
          type: 'primary',
          nativeType: 'submit',
        }),
      ],
      onSubmit: (event: Event) =>
        handleFormSubmit(
          event,
          this.props.profileFormState as TChangeProfileFormState,
          (profileErrors) => this.setProps({ profileErrors }),
          this.children.changeProfileForm as DsForm,
        ),
    })

    const passwordFormState: Record<
      string,
      { value: string; rules: TValidationRule[] }
    > = {}
    const passwordErrors: Record<string, string> = {}

    // Заполняем стейт и ошибки формы смены пароля
    mockUserData.editPasswordFormFields.forEach((field) => {
      passwordFormState[field.name] = {
        value: field.value ?? '',
        rules: formsRules[field.name] ?? [],
      }

      passwordErrors[field.name] = ''
    })

    const changePasswordForm = new DsForm({
      className: 'profile-change__password',
      fields: mockUserData.editPasswordFormFields.map(
        (field) =>
          new ProfileInput({
            label: field.label,
            type: field.type,
            placeholder: field.placeholder ?? field.value ?? '',
            value: field.value ?? '',
            autocomplete: field.autocomplete,
            name: field.name,
            onBlur: (event: Event) => {
              handleFieldChange(
                event,
                field.name,
                this.props.passwordFormState as TChangeProfileFormState,
                (newState) => this.setProps({ passwordFormState: newState }),
                this.children.changePasswordForm as DsForm,
              )
            },
          }),
      ),
      controls: [
        new DsButton({
          className: 'profile-change__save-button',
          content: 'Сохранить',
          type: 'primary',
          nativeType: 'submit',
        }),
      ],
      onSubmit: (event: Event) =>
        handleFormSubmit(
          event,
          this.props.passwordFormState as TChangeProfileFormState,
          (passwordErrors) => this.setProps({ passwordErrors }),
          this.children.changePasswordForm as DsForm,
        ),
    })

    super('div', {
      className: 'profile profile-container',
      user: { ...mockUserData },
      editProfileButton: new DsButton({
        content: 'Изменить данные',
        type: 'link',
        onClick: () => this.setProps({ isEditProfile: true }),
      }),
      editPasswordButton: new DsButton({
        content: 'Изменить пароль',
        type: 'link',
        onClick: () => this.setProps({ isEditPassword: true }),
      }),
      logoutButton: new DsButton({
        content: 'Выйти',
        type: 'link',
        dataPage: PAGES.LOGIN,
      }),
      Avatar: new DsIcon({
        className: 'profile__avatar-stub',
        name: 'profile-image-stub',
      }),
      BackButton: new DsButton({
        type: 'icon',
        iconName: 'arrow-left',
        iconClass: 'profile__icon',
        onClick: () => {
          if (this.props.isEditProfile) {
            this.setProps({ isEditProfile: false })
          } else if (this.props.isEditPassword) {
            this.setProps({ isEditPassword: false })
          } else {
            navigate(PAGES.NAV)
          }
        },
      }),
      profileFormState,
      profileErrors,
      changeProfileForm,

      passwordFormState,
      passwordErrors,
      changePasswordForm,
    })
  }

  render(): string {
    const user = this.props.user as TUser
    const { isEditProfile = false, isEditPassword = false } = this.props

    return `
      <nav class="profile__sidebar">
        {{{BackButton}}}
      </nav>

      <main class="profile__content">
        <button class="profile__avatar">
        ${
          user?.avatar
            ? `<img class="profile__avatar-image" src="${user.avatar}" alt="Ваш аватар">`
            : `{{{Avatar}}}`
        }
          <span class="profile__avatar-change-text">Поменять<br>аватар</span>
        </button>

        <h3 class="profile__name ${isEditProfile || isEditPassword ? 'profile__name_hidden' : ''}">
          ${user?.displayName}
        </h3>

        ${
          !(isEditProfile || isEditPassword)
            ? `
                <div class="profile__data">
                  ${this.renderStubs()}
                </div>

                <div class="profile__actions">
                  {{{editProfileButton}}}
                  <hr class="profile__row-divider">
                  {{{editPasswordButton}}}
                  <hr class="profile__row-divider">
                  {{{logoutButton}}}
                </div>
              `
            : isEditProfile
              ? '{{{changeProfileForm}}}'
              : isEditPassword
                ? '{{{changePasswordForm}}}'
                : ''
        }
      </main>
    `
  }

  private renderStubs() {
    return mockUserData.profileFormFields
      .map(
        (field) => `
          <div class="profile__row">
            <p class="profile__label">${field.label}</p>
            <p class="profile__value">${field.value}</p>
          </div>
          <hr class="profile__row-divider">
      `,
      )
      .join('')
  }
}
