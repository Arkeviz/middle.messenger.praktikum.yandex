import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'
import { DsInput } from './index'

interface IDsInputFieldProps extends IBaseBlockProps {
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

/**
 * Переключение класса-модификатора `ds-input__input_filled`
 * в зависимости от наличия значения инпута
 * для корректной работы перемещения `ds-input__label`
 * @param event
 */
const toggleFilledClass = (event: Event) => {
  const target: HTMLInputElement = event.target as HTMLInputElement

  if (target?.value) target?.classList.add('ds-input__input_filled')
  else target?.classList.remove('ds-input__input_filled')
}

export default class DsInputField extends Block<IDsInputFieldProps> {
  constructor(props: IDsInputFieldProps) {
    const events = {
      ...(props.onInput && { input: props.onInput }),
      ...(props.onChange && { change: props.onChange }),
      ...(props.onBlur && { blur: props.onBlur }),
      focusout: toggleFilledClass,
    }

    const className = props.className ? ' ' + props.className : ''
    const inputClass = props.inputClass ? ' ' + props.inputClass : ''

    super('div', {
      ...props,
      className: 'ds-input' + className,
      DsInput: new DsInput({
        className: inputClass,
        ...(props.autocomplete && { autocomplete: props.autocomplete }),
        ...(props.value && { value: props.value }),
        ...(props.type && { type: props.type }),
        ...(props.name && { name: props.name }),
        ...(props.disabled && { disabled: props.disabled }),
        ...(props.placeholder && { placeholder: props.placeholder }),
        events,
      }),
    })
  }

  render(): string {
    // TODO пофиксить стили связанные с `labelClass у диалогов`
    return `
      {{{DsInput}}}
      <label class="ds-input__label">{{label}}</label>
      <p class="ds-input__validation-label">{{error}}</p>
    `
  }
}
