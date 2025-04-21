import Block from '../../core/block.ts'

const navigationLinks = {
  login: 'Авторизация',
  register: 'Регистрация',
  profile: 'Профиль',
  'change-profile-data': 'Изменение данных юзера',
  'change-profile-password': 'Изменение пароля юзера',
  'empty-chat': 'Пустой чат',
  'current-chat': 'Чат с Вадимом',
  'chat-search-results': 'Карточка чата в поиске',
  'change-avatar': 'Диалог изменения аватара юзера',
  'loaded-file': 'Диалог с загруженным файлом',
  'on-load-error': 'Диалог с ошибкой загрузки',
  'add-user': 'Диалог добавления пользователя',
  'delete-user': 'Диалог удаления пользователя',
  'error-404': 'Страница 404',
  'error-500': 'Страница 500',
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
