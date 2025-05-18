import Block from '../../../core/block.ts'

export default class Err404Page extends Block {
  constructor() {
    super('main', {
      className: 'error',
    })
  }

  render(): string {
    return `
      <h2 class="error__title">404</h2>
      <p class="error__message">Не туда попали</p>
      <a class="error__chats-link" href="#" data-page="nav">Назад в меню</a>
    `
  }
}
