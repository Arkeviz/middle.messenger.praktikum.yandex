import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'

interface IDsIconProps extends IBaseBlockProps {
  name: string
}

export default class DsIcon extends Block<IDsIconProps> {
  constructor(props: IDsIconProps) {
    /**
     * Костыль, т.к. Handlebars совместно с Block
     * херово работает с SVG-спрайтами.
     * (не смог выяснить как пофиксить)
     */
    super('div', {
      ...props,
      className: 'ds-icon-container',
    })
  }

  render(): string {
    const className = this.props.className ? ' ' + this.props.className : ''
    const svgClass = 'ds-icon' + className

    return `
      <svg class="${svgClass}" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <use href="/icons/DsIconsSprite.svg#${this.props?.name}" />
      </svg>
    `
  }
}
