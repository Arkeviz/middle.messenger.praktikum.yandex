import type { TFormState, TValidationRule } from '../types'
import { DsForm } from '../components'
import Block from '../core/block.ts'

export const validateField = (
  rule: TValidationRule,
  formState: TFormState,
  input: HTMLInputElement,
  value: string,
): string => (rule.validator(value, formState, input) ? '' : rule.message)

export const validateForm = (formState: TFormState, form: DsForm) => {
  let hasErrors = false
  const errors: Record<string, string> = {}

  const fields = (form.getChildren()?.fields as Block[]) || []
  Object.keys(formState).forEach((field) => {
    const { rules, value } = formState[field]

    const inputField = fields.find(
      (input) => 'props' in input && input.props?.name === field,
    )
    const input = inputField?.element.querySelector('input')

    const checks = rules.map((rule) =>
      validateField(rule, formState, input as HTMLInputElement, value),
    )
    // Записываем только сообщение о первой ошибке
    const firstError = checks.find((c) => !!c) ?? ''
    errors[field] = firstError

    if (firstError) {
      hasErrors = true
    }
  })

  return { hasErrors, errors }
}
