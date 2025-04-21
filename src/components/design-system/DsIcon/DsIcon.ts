import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'

interface IDsIconProps extends IBaseBlockProps {
  name?: string
}

export default class DsIcon extends Block<IDsIconProps> {
  constructor(props: IDsIconProps) {
    super('svg', {
      ...props,
      className: 'ds-icon' + (props.className ?? ''),
    })
  }

  render(): string {
    return `
      <use href="/icons/DsIconsSprite.svg#{{name}}" />
    `
  }
}
