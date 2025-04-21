export interface IBaseBlockProps {
  className?: string
  attrs?: Record<string, string>
  events?: Record<string, EventListener>
  [key: string]: unknown
}
