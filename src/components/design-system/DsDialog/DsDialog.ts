import type { IBaseBlockProps } from '../../../types'
import Block from '../../../core/block.ts'

interface IDsModalProps extends IBaseBlockProps {
  title: string
  titleClass?: string
  /** Класс контейнера всего диалога */
  wrapperClass?: string
  /** Контент в теле диалога */
  content?: Block | HTMLElement | string
  /** Класс контейнера тела диалога (`content`) */
  bodyClass?: string
  footerContent?: Block | HTMLElement | string
  footerClass?: string
  /** Является ли диалог отображением ошибки.
   * (меняет цвет `title` на `$error-color`)
   */
  isError?: boolean

  onClose?: () => void
  onOpen?: () => void
}

export default class DsDialog extends Block<IDsModalProps> {
  constructor(props: IDsModalProps) {
    const className = props.className ? ' ' + props.className : ''

    super('div', {
      ...props,
      className: 'ds-dialog__overlay' + className,
      events: {
        click: (event: Event) => {
          this._closeDialog(event)
        },
      },
    })
  }

  /** Закрытие диалога при клике на оверлей */
  private _closeDialog(event: Event) {
    const target = event.target as HTMLElement

    if (target.classList.contains('ds-dialog__overlay')) {
      this.hide()
      this.props?.onClose?.()
    }
  }

  public closeDialog() {
    this.hide()
    this.props?.onClose?.()
  }

  public openDialog() {
    this.show()
    this.props?.onOpen?.()
  }

  render(): string {
    const { isError = false } = this.props
    const errorTitleClass = isError ? ' ' + 'ds-dialog__title_error' : ''

    return `
      <div class="ds-dialog {{wrapperClass}}">
        <h2 class="ds-dialog__title {{titleClass}}${errorTitleClass}">{{title}}</h2>

        <div class="ds-dialog__body {{bodyClass}}">
          {{{content}}}
        </div>

        <div class="ds-dialog__footer {{footerClass}}">
          {{{footerContent}}}
        </div>
      </div>
    `
  }
}
