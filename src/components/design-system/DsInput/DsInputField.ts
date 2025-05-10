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
    const isInputFile = props.type === 'file'

    const events = {
      ...(props.onInput && { input: props.onInput }),
      ...(props.onBlur && { blur: props.onBlur }),
      change: (event: Event) => {
        props?.onChange?.(event)

        // Если инпут с типом `file` - заменяем текст на название файла
        if (isInputFile) {
          const input = this.element.querySelector(
            '.ds-input__input',
          ) as HTMLInputElement
          const label = this.element.querySelector('.ds-input-file__text')

          const fileName =
            input!.files!.length > 0
              ? input!.files![0].name
              : 'Выбрать файл на компьютере'
          label!.innerHTML = fileName

          label?.classList.add('ds-input-file__text_uploaded')
        }
      },
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

  resetInput() {
    const input = this.element.querySelector(
      '.ds-input__input',
    ) as HTMLInputElement
    const label = this.element.querySelector('.ds-input-file__text')

    input.value = null
    label!.innerHTML = 'Выбрать файл на компьютере'
    label?.classList.remove('ds-input-file__text_uploaded')
  }

  render(): string {
    const isInputFile = this.props.type === 'file'

    return isInputFile
      ? `
          <label class="ds-input-file">
            {{{DsInput}}}
            <span class="ds-input-file__text">Выбрать файл на компьютере</span>
          </label>
        `
      : `
          {{{DsInput}}}
          <label class="ds-input__label">{{label}}</label>
          <p class="ds-input__validation-label">{{error}}</p>
        `
  }
}
