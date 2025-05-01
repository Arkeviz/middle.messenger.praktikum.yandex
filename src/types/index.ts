export interface IBaseBlockProps {
  className?: string
  attrs?: Record<string, string>
  events?: Record<string, EventListener>
  [key: string]: unknown
}

export type TFormField = {
  value: string
  rules: TValidationRule[]
}

export type TFormState = Record<string, TFormField>

export type TValidationRule = {
  message: string
  validator: (formState: TFormState, value: string) => boolean
}
