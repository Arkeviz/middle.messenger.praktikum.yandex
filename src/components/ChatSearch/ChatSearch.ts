import type { IBaseBlockProps } from '../../types'
import Block from '../../core/block.ts'
import { DsIcon } from '../design-system/DsIcon'

interface IChatSearchProps extends IBaseBlockProps {
  onInput?: (event: Event) => boolean | void
  onInputCb?: (event: Event) => boolean | void
  /** Задержка коллбека при вводе*/
  onInputDelay?: number
  onSubmit?: (event: Event) => boolean | void
}

export default class ChatSearch extends Block<IChatSearchProps> {
  constructor(props: IChatSearchProps) {
    let timeout: ReturnType<typeof setTimeout>

    super('form', {
      ...props,
      className: 'chat-search',
      SearchIcon: new DsIcon({
        name: 'search',
      }),
      onInputCb: (e: Event) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          this.props?.onInput?.(e)
        }, this.props.onInputDelay ?? 0)
      },
      events: {
        submit: (event: Event) => {
          event.preventDefault()
          props.onSubmit?.(event)
        },
      },
    })
  }

  componentDidMount() {
    const search = this.element.querySelector('input')
    search?.removeEventListener('input', this.props.onInputCb!)
    search?.addEventListener('input', this.props.onInputCb!)

    return true
  }

  render(): string {
    return `
      <input id="chat-search__input" class="chat-search__input" type="search" placeholder="Поиск"  />
      <label for="chat-search__input" class="chat-search__label">
        {{{SearchIcon}}}
        <p class="chat-search__label_hidden">Поиск</p>
      </label>
    `
  }
}
