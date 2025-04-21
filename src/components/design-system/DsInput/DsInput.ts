import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'

interface IInputProps extends IBaseBlockProps {
  type?: string
  placeholder?: string
  autocomplete?: string
  name?: string
  value?: string
  events?: {
    blur?: (event: Event) => void
    change?: (event: Event) => void
    input?: (event: Event) => void
  }
}

export default class DsInput extends Block<IInputProps> {
  constructor(props: IInputProps) {
    const className = props.className ? ' ' + props.className : ''
    super('input', {
      ...props,
      className: 'ds-input__input' + className,
      attrs: {
        type: props.type ?? 'text',
        placeholder: props.placeholder ?? '',
        autocomplete: props.autocomplete ?? 'off',
        name: props.name ?? '',
        value: props.value ?? '',
      },
    })
  }

  setValidity(error: string) {
    const elem = this.element as HTMLInputElement
    elem.setCustomValidity(error)
  }
}
