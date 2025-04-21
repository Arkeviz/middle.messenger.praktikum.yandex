import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'
import { DsInput } from './index'

interface IDsInputFieldProps extends IBaseBlockProps {
  label?: string
  title?: string
  type?: string
  placeholder?: string
  autocomplete?: string
  name?: string
  value?: string
  children?: Record<'DsInput', DsInput>

  error?: string

  onInput?: (event: Event) => void
  onChange?: (event: Event) => void
  onBlur?: (event: Event) => void
}

export default class DsInputField extends Block<IDsInputFieldProps> {
  constructor(props: IDsInputFieldProps) {
    const events = {
      ...(props.onInput && { input: props.onInput }),
      ...(props.onChange && { change: props.onChange }),
      ...(props.onBlur && { blur: props.onBlur }),
    }
    super('div', {
      ...props,
      className: 'ds-input' + (props.className ?? ''),
      DsInput: new DsInput({
        type: props.type,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        name: props.name,
        className: '',
        events,
      }),
    })
  }

  render(): string {
    // TODO пофиксить стили связанные с `labelClass`
    return `
      {{{DsInput}}}
      <label class="ds-input__label">{{label}}</label>
      <p class="ds-input__validation-label">{{error}}</p>
    `
  }
}
