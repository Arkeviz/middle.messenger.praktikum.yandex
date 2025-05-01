import Block from '../../core/block.ts'
import { PAGES } from '../../constants'

const navigationLinks = {
  [PAGES.LOGIN]: 'Авторизация',
  [PAGES.REGISTER]: 'Регистрация',
  [PAGES.PROFILE]: 'Профиль',
  [PAGES.CHANGE_PROFILE_DATA]: 'Изменение данных юзера',
  [PAGES.CHANGE_PROFILE_PASSWORD]: 'Изменение пароля юзера',
  [PAGES.EMPTY_CHAT]: 'Пустой чат',
  [PAGES.CURRENT_CHAT]: 'Чат с Вадимом',
  [PAGES.CHAT_SEARCH_RESULTS]: 'Карточка чата в поиске',
  [PAGES.CHANGE_AVATAR]: 'Диалог изменения аватара юзера',
  [PAGES.LOADED_FILE]: 'Диалог с загруженным файлом',
  [PAGES.ON_LOAD_ERROR]: 'Диалог с ошибкой загрузки',
  [PAGES.ADD_USER]: 'Диалог добавления пользователя',
  [PAGES.DELETE_USER]: 'Диалог удаления пользователя',
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
