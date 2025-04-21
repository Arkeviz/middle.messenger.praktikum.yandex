import './assets/scss/normalize.css'
import './assets/fonts/fonts.scss'
import './assets/scss/main.scss'

import Handlebars from 'handlebars'
import * as Components from './components'
import * as Layouts from './layouts'
import * as Pages from './pages'
import renderApp from './core/renderApp.ts'

const pages = {
  login: Pages.LoginPage,
  nav: Pages.NavPage,
  register: Pages.RegisterPage,
}

type TPageKey = keyof typeof pages

function navigate(page: TPageKey) {
  const sourcePage = pages[page]
  if (sourcePage) {
    renderApp(new sourcePage())
    return
  }

  console.error(`Страница «${page}» не найдена`)
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'))

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
