import type { IBaseBlockProps } from '../../types'
import type { TChat } from '../../types/chats.ts'
import Block from '../../core/block.ts'
import { mockUserData } from '../../mocks/mockUser.ts'
import { formatChatDate } from '../../utils/formatDates.ts'

interface IChatSidebarProps extends IBaseBlockProps {
  chats: TChat[]
  isSearchResults: boolean
  activeChatId: number | null

  onChatSelect?: (id: number) => void
}

export default class ChatsList extends Block<IChatSidebarProps> {
  constructor(props: IChatSidebarProps) {
    super('section', {
      ...props,
      className: 'chats-list',
      events: {
        click: (event: Event) => this._handleChatClick(event),
      },
    })
  }

  private _handleChatClick(event: Event) {
    const targetChat = (event.target as HTMLElement).closest(
      '.chat-item-wrapper',
    )
    const chatId = +targetChat!.getAttribute('data-chat-id')!

    this._setActiveChat(chatId)

    if (targetChat) {
      this.props.onChatSelect?.(chatId)
    }
  }

  private _setActiveChat(chatId: number) {
    const chatItems =
      this.element.querySelectorAll<HTMLElement>('.chat-item-wrapper')

    chatItems.forEach((item) => {
      if (+item.getAttribute('data-chat-id')! === chatId) {
        item.classList.add('chat-item-wrapper_active')
      } else {
        item.classList.remove('chat-item-wrapper_active')
      }
    })
  }

  render(): string {
    const chats = this.props.chats

    return chats && chats.length
      ? chats
          .sort((a, b) => {
            const dateA = +new Date(a.last_message.time)
            const dateB = +new Date(b.last_message.time)
            if (dateA > dateB) return -1
            else if (dateA < dateB) return 1
            else return 0
          })
          .map((chat) => {
            const wrapperClass =
              'chat-item-wrapper' +
              (this.props.activeChatId == chat.id
                ? ' ' + 'chat-item-wrapper_active'
                : '') +
              (this.props.isSearchResults ? ' ' + 'chat-item_search' : '')

            return `
              <button data-chat-id="${chat.id}" class="${wrapperClass}">
                <div class="chat-item">
                  ${
                    chat.avatar
                      ? `<img class="chat-item__avatar" src="${chat.avatar}" alt="Аватар чата">`
                      : '<div class="chat-item__avatar"></div>'
                  }

                  <div class="chat-item__name">${chat.title}</div>
                  <div class="chat-item__message">
                    ${
                      chat.last_message.user.login == mockUserData.login
                        ? '<span class="chat-item__message_yours">Вы: </span>'
                        : ''
                    }
                    ${chat.last_message.content}
                  </div>

                  <div class="chat-item__time">${formatChatDate(chat.last_message.time)}</div>
                  ${chat.unread_count ? `<div class="chat-item__counter">${chat.unread_count}</div>` : ''}
                </div>
              </button>
            `
          })
          .join('')
      : '<p class="empty-message">Здесь ничего нет. Самое время это исправить!</p>'
  }
}
