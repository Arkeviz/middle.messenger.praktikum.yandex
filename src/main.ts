import './assets/scss/normalize.scss'
import './assets/fonts/fonts.scss'
import './assets/scss/main.scss'

import { PAGES } from './constants'
import * as Pages from './pages'
import renderApp from './core/renderApp.ts'

const pages = {
  [PAGES.LOGIN]: Pages.LoginPage,
  [PAGES.NAV]: Pages.NavPage,
  [PAGES.REGISTER]: Pages.RegisterPage,
  [PAGES.PROFILE]: Pages.ProfilePage,
  [PAGES.CHATS]: Pages.ChatPage,
  [PAGES.ERROR_404]: Pages.ErrPage404,
  [PAGES.ERROR_500]: Pages.ErrPage500,
}

type TPageKey = keyof typeof pages

export function navigate(page: TPageKey) {
  const sourcePage = pages[page]
  if (sourcePage) {
    renderApp(new sourcePage())
    return
  }

  console.error(`Страница «${page}» не найдена`)
}

document.addEventListener('DOMContentLoaded', () => navigate(PAGES.NAV))

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if (target) {
    const page = target.getAttribute('data-page')

    if (!page || !(page in pages)) {
      return
    }

    navigate(page as TPageKey)
    window.scrollTo(0, 0)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
