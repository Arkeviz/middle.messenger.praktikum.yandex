import { IBaseBlockProps } from '../../types'
import { DsInput } from '../design-system/DsInput'
import Block from '../../core/block.ts'

interface IProfileInputProps extends IBaseBlockProps {
  label?: string
  type?: string
  placeholder?: string
  autocomplete?: string
  name?: string
  value?: string
  disabled?: boolean
  inputClass?: string

  error?: string

  onInput?: (event: Event) => void
  onChange?: (event: Event) => void
  onBlur?: (event: Event) => void
}

export default class ProfileInput extends Block<IProfileInputProps> {
  constructor(props: IProfileInputProps) {
    const events = {
      ...(props.onInput && { input: props.onInput }),
      ...(props.onChange && { change: props.onChange }),
      ...(props.onBlur && { blur: props.onBlur }),
    }

    const className = props.className ? ' ' + props.className : ''
    const inputClass = props.inputClass ? ' ' + props.inputClass : ''

    super('div', {
      ...props,
      className: 'profile-input' + className,
      DsInput: new DsInput({
        className: 'profile-input__input' + inputClass,
        autocomplete: props.autocomplete ?? 'off',
        ...(props.value && { value: props.value }),
        ...(props.type && { type: props.type }),
        ...(props.name && { name: props.name }),
        ...(props.placeholder && { placeholder: props.placeholder }),
        ...(props.disabled && { disabled: props.disabled }),
        events,
      }),
    })
  }

  render(): string {
    return `
      <label class="profile-input__label">{{label}}</label>
      {{{DsInput}}}
      <p class="profile-input__validation-label">{{error}}</p>
    `
  }
}
