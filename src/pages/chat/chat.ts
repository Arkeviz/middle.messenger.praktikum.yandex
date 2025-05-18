import { EMessageTypes, TChatData } from '../../types/chats.ts'
import type { TValidationRule } from '../../types'
import Block from '../../core/block.ts'
import {
  ChatSidebar,
  DsButton,
  DsDialog,
  DsForm,
  DsIcon,
  DsInputField,
} from '../../components'
import { RULE_REQUIRED } from '../../utils/validationRules.ts'
import { mockChats } from '../../mocks/mockChats.ts'
import { mockUserData } from '../../mocks/mockUser.ts'
import { mockChatsMessages } from '../../mocks/mockChatsMessages.ts'
import {
  handleFieldChange,
  handleFormSubmit,
} from '../../components/design-system/DsForm/handlers.ts'

type TAddUserFormState = Record<
  'login',
  { value: string; rules: TValidationRule[] }
>

export default class ChatPage extends Block {
  // + TODO доделать хедер
  // + TODO доделать футер
  // + TODO сделать страницы 404, 500
  // TODO перепроверить
  // TODO поправить косяки
  constructor() {
    const addUserFormState = {
      login: {
        value: '',
        rules: [RULE_REQUIRED],
      },
    }
    const addUserErrors = {
      login: '',
    }
    const addUserForm = new DsForm({
      className: 'add-user-dialog__form',
      fields: [
        new DsInputField({
          label: 'Логин',
          type: 'text',
          autocomplete: 'username',
          name: 'login',
          onBlur: (event: Event) =>
            handleFieldChange(
              event,
              'login',
              this.props.addUserFormState as TAddUserFormState,
              (newState) => (this.props.addUserFormState = newState),
              this.children.addUserForm as DsForm,
            ),
        }),
      ],
      controls: [
        new DsButton({
          className: 'add-user-dialog__button',
          content: 'Добавить',
          type: 'primary',
          nativeType: 'submit',
        }),
      ],
      onSubmit: () =>
        handleFormSubmit(
          this.props.addUserFormState as TAddUserFormState,
          (addUserErrors) => this.setProps({ addUserErrors }),
          this.children.addUserForm as DsForm,
        ),
    })

    super('div', {
      className: 'chat-wrapper',
      activeChat: null,
      activeChatId: null,
      CheckIconRaw: `
        <svg class="ds-icon chat-message__check">
          <use href="/icons/DsIconsSprite.svg#check-double" />
        </svg>
      `,
      ChatSidebar: new ChatSidebar({
        chats: mockChats,
        activeChatId: null,
        onChatSelect: (activeChatId: number) => {
          this.setProps({
            activeChat:
              mockChatsMessages.find((chat) => chat.id === activeChatId) ??
              null,
            activeChatId,
          })
          ;(this.children.ChatSidebar as ChatSidebar).props.activeChatId =
            activeChatId
        },
      }),
      SettingsButton: new DsButton({
        className: 'chat__header-settings-button',
        type: 'icon',
        iconName: 'settings-dots',
        iconClass: 'chat__header-settings',
        onClick: () => {
          ;(this.children.ChangeChatUsersDialog as DsDialog).openDialog()
        },
      }),
      DsChatSubmitButton: new DsButton({
        className: 'chat-footer__send-button',
        type: 'icon',
        iconName: 'arrow-right',
        nativeType: 'submit',
      }),
      DsAttachmentIcon: new DsIcon({
        className: 'chat-footer__attachment-button',
        name: 'attachment',
      }),
      onChatSubmit: (event: Event) => {
        event.preventDefault()
        const messageInput = this.element.querySelector(
          '.chat-footer__input',
        ) as HTMLInputElement
        console.log('Сообщение отправлено:', messageInput.value)

        messageInput.value = ''
      },
      isAddUser: true,
      addUserFormState,
      addUserErrors,
      addUserForm,
      ChangeChatUsersDialog: new DsDialog({
        title: 'Добавить пользователя',
        bodyClass: 'add-user-dialog',
        content: addUserForm,
        onClose: () => {
          // Крайне тяжело-типизируемый момент:
          // нужно как-то подтягивать типы для детей, которые всё равно приходят как пропсы
          // не смог придумать как это пофиксить
          // @ts-ignore
          this.children.addUserForm.children.fields[0]?.resetInput?.()
        },
      }),
    })
  }

  /** Генерация одного сообщения */
  private _getMessage(message: TChatData['messages'][0]) {
    const isCurrentUserMessage = mockUserData.login === message.user.login

    return `
      <div class="chat-message${!isCurrentUserMessage ? ' ' + 'chat-message_other-user' : ''}">
        ${
          message.type === EMessageTypes.IMAGE
            ? `
              <div class="chat-message chat-message_other-user">
                <img class="chat-message__image" src="${message.content}" alt="${message.content}">
                <time class="chat-message__date chat-message__date_float">
                  ${isCurrentUserMessage ? '{{{CheckIconRaw}}}' : ''}
                  ${new Date(message.time).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>
            `
            : `
              <p class="chat-message__text">
                ${message.content}
                <time class="chat-message__date">
                  ${isCurrentUserMessage ? '{{{CheckIconRaw}}}' : ''}
                  ${new Date(message.time).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </p>
            `
        }
      </div>
    `
  }

  /** Генерация всех сообщений и даты-разделители между ними */
  private _getMessages() {
    const messages = (this.props.activeChat as TChatData).messages

    let finalString = ''
    for (let i = 0; i < messages.length; i++) {
      if (i == 0) {
        const date = new Date(messages[i].time)
        const isSameYear = new Date().getFullYear() === date.getFullYear()
        const formattedDate = date.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          ...(!isSameYear && { year: 'numeric' }),
        })

        finalString +=
          `<div class="chat__messages-date">${formattedDate}</div>` +
          this._getMessage(messages[i])
        continue
      }

      const previousDay = new Date(messages[i - 1].time)
      previousDay.setHours(0, 0, 0, 0)
      const currentDay = new Date(messages[i].time)
      currentDay.setHours(0, 0, 0, 0)

      const daysDiff = Math.floor(
        (previousDay.getTime() - currentDay.getTime()) / 86400000,
      )
      const isSameYear = new Date().getFullYear() === currentDay.getFullYear()

      if (daysDiff != 0) {
        const date = new Date(messages[i].time).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          ...(!isSameYear && { year: 'numeric' }),
        })
        finalString +=
          `<div class="chat__messages-date">${date}</div>` +
          this._getMessage(messages[i])
      } else {
        finalString += this._getMessage(messages[i])
      }
    }

    return finalString
  }

  private _addChatInputListener() {
    const footer = this.element.querySelector('.chat__footer')
    footer?.removeEventListener(
      'submit',
      this.props.onChatSubmit as (event: Event) => void,
    )
    footer?.addEventListener(
      'submit',
      this.props.onChatSubmit as (event: Event) => void,
    )
  }

  componentDidUpdate() {
    this._addChatInputListener()
    return true
  }

  render(): string {
    const activeChat = this.props.activeChat as TChatData

    return `
      {{{ChatSidebar}}}

      <main class="chat-main">
        ${
          this.props.activeChatId == null
            ? '<p class="empty-message">Выберите чат, чтобы отправить сообщение<br>(Работают только Вадим и Андрей)</p>'
            : `
              <div class="chat-content-wrapper">
                <header class="chat__header">
                  ${activeChat?.avatar ? `<img class="chat__header-avatar" src="${activeChat.avatar}" alt="Аватар открытого чата">` : '<div class="chat__header-avatar"></div>'}

                  <p class="chat__header-name">${activeChat?.title}</p>

                  {{{SettingsButton}}}
                </header>

                <div class="chat__messages">
                  <div class="chat__messages-wrapper">
                    ${this._getMessages()}
                  </div>
                </div>

                <form class="chat__footer">
                  <button type="button" class="chat-footer__attachment-button">
                    {{{DsAttachmentIcon}}}
                  </button>

                  <div class="chat-footer__input-wrapper">
                    <label class="chat-footer__input-label">Введите сообщение</label>
                    <input
                        name="message"
                        type="text"
                        placeholder="Сообщение"
                        autocomplete="off"
                        class="chat-footer__input"
                    >
                  </div>

                  {{{DsChatSubmitButton}}}
                </form>
              </div>
            `
        }
        {{{ChangeChatUsersDialog}}}
      </main>
    `
  }
}
