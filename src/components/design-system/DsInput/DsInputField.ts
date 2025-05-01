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

/**
 * Переключение класса-модификатора `ds-input__input_filled`
 * в зависимости от наличия значения инпута
 * для корректной работы перемещения `ds-input__label`
 * @param event
 */
const toggleInputClassModifier = (event: Event) => {
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
      focusout: toggleInputClassModifier,
    }
    super('div', {
      ...props,
      className: 'ds-input' + (props.className ?? ''),
      DsInput: new DsInput({
        autocomplete: props.autocomplete,
        ...(props.type && { type: props.type }),
        ...(props.name && { name: props.name }),
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
