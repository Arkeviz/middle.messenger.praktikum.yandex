import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'
import { PAGES } from '../../../constants'
import { DsIcon } from '../DsIcon'

interface IBaseButtonProps extends IBaseBlockProps {
  nativeType?: HTMLButtonElement['type']
  type?: 'primary' | 'link' | 'icon'

  // Здесь `unknown` не подходит из-за `IBaseBlockProps` Блока

  /** Основной контент кнопки */
  // @ts-ignore
  content?: string | Block<any>
  /** Контент ДО основного */
  // @ts-ignore
  prepend?: string | Block<any>
  /** Контент ПОСЛЕ основного */
  // @ts-ignore
  append?: string | Block<any>
  iconName?: string
  iconClass?: string
  disabled?: boolean
  /** Страница, на которую перекидывает кнопка */
  dataPage?: PAGES
  onClick?: (event: Event) => void
}

/** Частный случай конпки-иконки */
interface IDsButtonIconProps extends IBaseButtonProps {
  type: 'icon'
  iconName: string
  content?: never
}

type TDsButtonProps = IBaseButtonProps | IDsButtonIconProps

export default class DsButton extends Block<TDsButtonProps> {
  constructor(props: TDsButtonProps) {
    const buttonClass = ` ds-button__${props.type}`
    const className = props.className ? ' ' + props.className : ''

    const attrs: Record<string, string> = {
      type: props.nativeType ?? 'button',
      ...(props.disabled && { disabled: 'true' }),
      ...(props.dataPage && { 'data-page': props.dataPage }),
    }

    const isButtonIcon = props.type === 'icon'

    super('button', {
      ...props,
      attrs,
      className: 'ds-button' + buttonClass + className,

      ...(isButtonIcon && {
        Icon: new DsIcon({
          name: props.iconName as string,
          className: props.iconClass ?? '',
        }),
      }),

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
      return `{{{Icon}}}`
    } else {
      return `
        {{{prepend}}}
        {{{content}}}
        {{{append}}}
      `
    }
  }
}
