import type { TValidationRule } from '../../types'
import type { TUser } from '../../types/user.ts'
import Block from '../../core/block.ts'
import {
  RULE_EMAIL,
  RULE_FIO,
  RULE_LOGIN,
  RULE_PASSWORD,
  RULE_PASSWORD_REPEAT,
  RULE_PHONE,
  RULE_REQUIRED,
  RULE_REQUIRED_FILE,
} from '../../utils/validationRules.ts'
import { PAGES } from '../../constants'
import {
  DsButton,
  DsDialog,
  DsForm,
  DsIcon,
  DsInputField,
  ProfileInput,
} from '../../components'
import {
  handleFieldChange,
  handleFormSubmit,
} from '../../components/design-system/DsForm/handlers.ts'
import { mockUserData } from '../../mocks/mockUser.ts'
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

type TChangeAvatarFormState = Record<
  'file',
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

    const profileFormState: TChangeProfileFormState =
      {} as TChangeProfileFormState
    const profileErrors: Record<string, string> = {}

    // Заполняем стейт и ошибки формы изменения данных профиля
    mockUserData.profileFormFields.forEach((field) => {
      profileFormState[field.name as keyof TChangeProfileFormState] = {
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
                (newState) => (this.props.profileFormState = newState),
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
      onSubmit: () =>
        handleFormSubmit(
          this.props.profileFormState as TChangeProfileFormState,
          (profileErrors) => this.setProps({ profileErrors }),
          this.children.changeProfileForm as DsForm,
        ),
    })

    const passwordFormState: TChangePasswordFormState =
      {} as TChangePasswordFormState
    const passwordErrors: Record<string, string> = {}

    // Заполняем стейт и ошибки формы смены пароля
    mockUserData.editPasswordFormFields.forEach((field) => {
      passwordFormState[field.name as keyof TChangePasswordFormState] = {
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
                (newState) => (this.props.passwordFormState = newState),
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
      onSubmit: () =>
        handleFormSubmit(
          this.props.passwordFormState as TChangeProfileFormState,
          (passwordErrors) => this.setProps({ passwordErrors }),
          this.children.changePasswordForm as DsForm,
        ),
    })

    const uploadAvatarFormState = {
      file: {
        value: null,
        rules: [RULE_REQUIRED_FILE],
      },
    }
    const uploadAvatarErrors = {
      file: '',
    }

    const uploadAvatarForm = new DsForm({
      className: 'profile-upload-avatar',
      fields: [
        new DsInputField({
          className: 'ds-input__file-input',
          label: 'Выбрать файл на компьютере',
          type: 'file',
          name: 'file',
          onBlur: (event: Event) => {
            handleFieldChange(
              event,
              'file',
              this.props.uploadAvatarFormState as TChangeAvatarFormState,
              (newState) => (this.props.uploadAvatarFormState = newState),
              this.children.uploadAvatarForm as DsForm,
            )
          },
        }),
      ],
      controls: [
        new DsButton({
          className: 'avatar-upload__confirm-button',
          content: 'Поменять',
          type: 'primary',
          nativeType: 'submit',
        }),
      ],
      onSubmit: () => {
        const isSuccess = handleFormSubmit(
          this.props.uploadAvatarFormState as TChangeAvatarFormState,
          (uploadAvatarErrors) => this.setProps({ uploadAvatarErrors }),
          this.children.uploadAvatarForm as DsForm,
        )

        if (!isSuccess) {
          ;(
            this.children.uploadAvatarDialog as typeof uploadAvatarDialog
          ).setProps({
            isError: true,
            title: 'Ошибка, попробуйте ещё раз',
            footerContent: `<p class="ds-dialog__confirm-error">Нужно выбрать файл</p>`,
          })
        } else {
          ;(
            this.children.uploadAvatarDialog as typeof uploadAvatarDialog
          ).setProps({
            isError: false,
            title: 'Успешно!',
            footerContent: '',
          })
        }
      },
    })

    const uploadAvatarDialog = new DsDialog({
      className: 'avatar-upload-dialog',
      title: 'Загрузите файл',
      content: uploadAvatarForm,
      bodyClass: 'avatar-upload__body',
      onClose: () => {
        // @ts-ignore
        this.children.uploadAvatarForm.children.fields[0]?.resetInput?.()
        ;(
          this.children.uploadAvatarDialog as typeof uploadAvatarDialog
        ).setProps({
          isError: false,
          title: 'Загрузите файл',
          footerContent: '',
        })
      },
    })

    super('div', {
      className: 'profile profile-container',
      user: { ...mockUserData },
      editProfileButton: new DsButton({
        content: 'Изменить данные',
        type: 'link',
        onClick: () => (this.props.isEditProfile = true),
      }),
      editPasswordButton: new DsButton({
        content: 'Изменить пароль',
        type: 'link',
        onClick: () => (this.props.isEditPassword = true),
      }),
      logoutButton: new DsButton({
        content: 'Выйти',
        type: 'link',
        dataPage: PAGES.LOGIN,
      }),
      avatarStub: new DsIcon({
        className: 'profile__avatar-stub',
        name: 'profile-image-stub',
      }),
      backButton: new DsButton({
        type: 'icon',
        iconName: 'arrow-left',
        iconClass: 'profile__icon',
        onClick: () => {
          if (this.props.isEditProfile) {
            this.props.isEditProfile = false
          } else if (this.props.isEditPassword) {
            this.props.isEditPassword = false
          } else {
            navigate(PAGES.CHATS)
          }
        },
      }),
      profileFormState,
      profileErrors,
      changeProfileForm,

      passwordFormState,
      passwordErrors,
      changePasswordForm,

      uploadAvatarFormState,
      uploadAvatarErrors,
      uploadAvatarForm,
      uploadAvatarDialog,
      onDialogOpen: () =>
        (this.children?.uploadAvatarDialog as DsDialog)?.openDialog?.(),
    })
  }

  render(): string {
    const user = this.props.user as TUser
    const { isEditProfile = false, isEditPassword = false } = this.props

    return `
      <nav class="profile__sidebar">
        {{{backButton}}}
      </nav>

      <main class="profile__content">
        <button type="button" class="profile__avatar">
        ${
          user?.avatar
            ? `<img class="profile__avatar-image" src="${user.avatar}" alt="Ваш аватар">`
            : `{{{avatarStub}}}`
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
                  ${this._renderStubs()}
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
      {{{uploadAvatarDialog}}}
    `
  }

  private _renderStubs() {
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

  /** Добавить слушатель события */
  private _addOpenDialogListener() {
    const avatarButton = this.element.querySelector('.profile__avatar')

    avatarButton?.removeEventListener(
      'click',
      this.props.onDialogOpen as (event: Event) => void,
    )
    avatarButton?.addEventListener(
      'click',
      this.props.onDialogOpen as (event: Event) => void,
    )
  }

  componentDidMount() {
    this._addOpenDialogListener()
    return true
  }

  componentDidUpdate() {
    this._addOpenDialogListener()
    return true
  }
}
