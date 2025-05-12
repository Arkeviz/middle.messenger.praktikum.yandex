import Block from '../../core/block.ts'
import { PAGES } from '../../constants'

const navigationLinks = {
  [PAGES.LOGIN]: 'Авторизация',
  [PAGES.REGISTER]: 'Регистрация',
  [PAGES.PROFILE]: 'Профиль',
  [PAGES.CHATS]: 'Чаты',
  [PAGES.ERROR_404]: 'Страница 404',
  [PAGES.ERROR_500]: 'Страница 500',
}

export default class NavigationPage extends Block {
  constructor() {
    super('main', {
      className: 'navigation-container',
    })
  }

  render(): string {
    const links = Object.entries(navigationLinks).reduce(
      (acc, [key, value]) =>
        acc +
        `<li class="navigation__links"><a href="#" data-page="${key}">${value}</a></li>`,
      '',
    )
    return `
      <p>Навигация по приложению</p>
      <nav class="navigation">
        <ul class="navigation__list">
          ${links}
        </ul>
      </nav>
    `
  }
}
