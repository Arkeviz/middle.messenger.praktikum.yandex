import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'
import { PAGES } from '../../../constants'
import { DsIcon } from '../DsIcon'

interface IDsButtonProps extends IBaseBlockProps {
  nativeType?: HTMLButtonElement['type']
  type?: 'primary' | 'link' | 'icon'
  /** Текст кнопки */
  content?: string | Block
  iconName?: string
  disabled?: boolean
  /** Страница, на которую перекидывает кнопка */
  dataPage?: PAGES
  onClick?: (event: Event) => void
}

export default class DsButton extends Block<IDsButtonProps> {
  constructor(props: IDsButtonProps) {
    const buttonClass = ` ds-button__${props.type} `

    const attrs: Record<string, string> = {
      type: props.nativeType ?? 'button',
      ...(props.disabled && { disabled: true }),
      ...(props.dataPage && { 'data-page': props.dataPage }),
    }

    const isButtonIcon = props.type === 'icon'

    super('button', {
      ...props,
      attrs,
      className: (
        'ds-button' +
        buttonClass +
        (props.className ?? '')
      ).trimEnd(),

      ...(isButtonIcon && { DsIcon: new DsIcon({ name: props.iconName }) }),

      events: {
        click: (event: Event) => {
          if (props.onClick) {
            props.onClick(event)
          }
        },
      },
    })
  }

  render(): string {
    const isIcon = this.props.type === 'icon'
    if (isIcon) {
      return `{{{DsIcon}}}`
    } else {
      return `{{{content}}}`
    }
  }
}
