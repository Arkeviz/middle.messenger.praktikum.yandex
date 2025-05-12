import type { TFormState } from '../../../types'
import Block from '../../../core/block.ts'
import { DsForm } from './index.ts'
import { validateField, validateForm } from '../../../utils/formValidate.ts'
import { DsInput, DsInputField } from '../DsInput'

export const handleFieldChange = (
  event: Event,
  field: string,
  formState: TFormState,
  updateFormState: (newState: TFormState) => void,
  form: DsForm,
): void => {
  const { value } = event.target as HTMLInputElement

  const { rules } = formState[field]

  const checks = rules.map((rule) =>
    validateField(rule, formState, event.target as HTMLInputElement, value),
  )
  const firstError = checks.find((c) => !!c) ?? ''

  const fields: DsInputField | DsInputField[] =
    (form.getChildren()?.fields as DsInputField[]) || []

  if (Array.isArray(fields)) {
    const inputField = fields.find((input) => {
      return 'props' in input && input.props?.name === field
    })

    inputField?.setProps?.({ error: firstError })
    const input = inputField?.children?.['DsInput'] as DsInput
    input?.setValidity?.(firstError)
  }

  updateFormState({
    ...formState,
    [field]: {
      value,
      rules,
    },
  })
}

export const handleFormSubmit = (
  formState: TFormState,
  updateErrors: (errors: Record<string, string>) => void,
  form: DsForm,
) => {
  const { hasErrors, errors } = validateForm(formState, form)
  updateErrors(errors)

  const fields = (form.getChildren()?.fields as Block[]) || []

  Object.keys(errors).forEach((field) => {
    const inputField = fields.find((input) => {
      return 'props' in input && input.props?.name === field
    })

    inputField?.setProps?.({ error: errors[field] })
  })

  if (!hasErrors) {
    console.log('Форма заполнена норм:', formState)
    return true
  }
  console.error('Форма заполнена неверно:', errors)
  return false
}
