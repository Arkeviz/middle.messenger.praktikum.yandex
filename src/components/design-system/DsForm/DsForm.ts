import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'

interface IFormProps extends IBaseBlockProps {
  title?: string
  fields?: Block[]
  controls?: Block[]
  headingClass?: string
  onSubmit?: (event: Event) => boolean | void
  onClick?: () => void
}

export default class DsForm extends Block<IFormProps> {
  constructor(props: IFormProps) {
    const className = props.className ? ' ' + props.className : ''

    super('form', {
      ...props,
      className: 'ds-form' + className,
      events: {
        submit: (event: Event) => {
          event.preventDefault()
          props.onSubmit?.(event)
        },
      },
    })
  }

  render(): string {
    // TODO {{formClass}} убрать на логине и регистрации
    return `
      ${this.props.title ? '<h2 class="ds-form__title {{headingClass}}">{{title}}</h2>' : ''}
      {{#each fields}}
        {{{this}}}
      {{/each}}

      {{#each controls}}
        {{{this}}}
      {{/each}}
    `
  }
}
