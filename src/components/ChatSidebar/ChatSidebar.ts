import type { IBaseBlockProps } from '../../types'
import type { TChat } from '../../types/chats.ts'
import Block from '../../core/block.ts'
import { DsButton } from '../design-system/DsButton'
import { PAGES } from '../../constants'
import { DsIcon } from '../design-system/DsIcon'
import { ChatSearch } from '../ChatSearch'
import { ChatsList } from '../ChatsList'

interface IChatSidebarProps extends IBaseBlockProps {
  chats: TChat[]
  activeChatId: number | null

  onChatSelect: (id: number) => void
}

export default class ChatSidebar extends Block<IChatSidebarProps> {
  constructor(props: IChatSidebarProps) {
    const searchChats = (event: Event) => {
      if ((event?.target as HTMLInputElement)?.value === '') {
        ;(this.children.ChatList as ChatsList).setProps({
          chats: this.props.chats,
          isSearchResults: false,
        })
        return
      }

      const searchStr = (event.target as HTMLInputElement).value
      const filteredChats = this.props.chats?.filter((chat) =>
        chat.title.toLowerCase().includes(searchStr.toLowerCase()),
      )
      ;(this.children.ChatList as ChatsList).setProps({
        chats: filteredChats,
        isSearchResults: true,
      })
    }

    super('div', {
      ...props,
      className: 'chat-sidebar',
      ProfileButton: new DsButton({
        className: 'sidebar__profile-link',
        content: 'Профиль',
        append: new DsIcon({
          name: 'keyboard-arrow-right',
        }),
        type: 'link',
        dataPage: PAGES.PROFILE,
      }),
      ChatSearch: new ChatSearch({
        onInput: searchChats,
        onInputDelay: 200,
        onSubmit: searchChats,
      }),
      ChatList: new ChatsList({
        chats: props.chats,
        isSearchResults: false,
        activeChatId: null,
        onChatSelect: (id: number) => this.props.onChatSelect(id),
      }),
    })
  }

  render(): string {
    return `
      {{{ProfileButton}}}
      {{{ChatSearch}}}
      {{{ChatList}}}
    `
  }
}
