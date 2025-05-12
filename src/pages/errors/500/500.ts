import Block from '../../../core/block.ts'

export default class Err404Page extends Block {
  constructor() {
    super('main', {
      className: 'error',
    })
  }

  render(): string {
    return `
      <h2 class="error__title">500</h2>
      <p class="error__message">Мы уже фиксим</p>
      <a class="error__chats-link" href="#" data-page="nav">Назад в меню</a>
    `
  }
}
