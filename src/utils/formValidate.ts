import type { TFormState, TValidationRule } from '../types'

export const validateField = (
  value: string,
  rule: TValidationRule,
  formState: TFormState,
): string => (rule.validator(formState, value) ? '' : rule.message)

export const validateForm = (formState: TFormState) => {
  let hasErrors = false
  const errors: Record<string, string> = {}

  Object.keys(formState).forEach((field) => {
    const { rules, value } = formState[field]
    const checks = rules.map((rule) => validateField(value, rule, formState))
    // Записываем только сообщение о первой ошибке
    const firstError = checks.find((c) => !!c) ?? ''
    errors[field] = firstError

    if (firstError) {
      hasErrors = true
    }
  })

  return { hasErrors, errors }
}
