import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'

interface IInputProps extends IBaseBlockProps {
  type?: string
  placeholder?: string
  autocomplete?: string
  name?: string
  value?: string
  disabled?: boolean
  events?: {
    [key: string]: (event: Event) => void
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
        autocomplete: props.autocomplete ?? 'off',
        ...(props.placeholder && { placeholder: props.placeholder }),
        ...(props.name && { name: props.name }),
        ...(props.disabled && { disabled: `${props.disabled}` }),
        ...(props.value && { value: props.value }),
      },
    })
  }

  setValidity(error: string) {
    const elem = this.element as HTMLInputElement
    elem.setCustomValidity(error)
  }
}
