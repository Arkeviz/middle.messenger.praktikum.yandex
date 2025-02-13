import './assets/scss/normalize.css'
import './assets/fonts/fonts.scss'
import './assets/scss/main.scss'

import Handlebars from 'handlebars'
import * as Components from './components'
import * as Layouts from './layouts'
import * as Pages from './pages'

Handlebars.registerHelper(
  'isButtonIcon',
  (value) => value == 'icon'
)
Handlebars.registerHelper(
  'dialogTitleClass',
  (value) => !!value ? 'ds-dialog__title_error' : ''
)

const AppPartials = [...Object.entries(Layouts), ...Object.entries(Components)]

AppPartials.forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template)
})

const pages = {
  'login': [ Pages.LoginPage ],
  'nav': [ Pages.NavPage ],
  'register': [ Pages.RegisterPage, {
    fields: [
      { label: 'Почта', type: 'email', },
      { label: 'Логин', type: 'text', },
      { label: 'Имя', type: 'text', },
      { label: 'Фамилия', type: 'text', },
      { label: 'Телефон', type: 'tel', },
      { label: 'Пароль', type: 'password', },
      { label: 'Пароль (ещё раз)', type: 'password', errorMessage: 'Пароли не совпадают' },
    ]
  }],
  'profile': [ Pages.ProfilePage, {
    firstname: 'Алексей',
    fields: [
      { label: 'Почта', value: 'pochta@ya.ru' },
      { label: 'Логин', value: 'Arkeviz' },
      { label: 'Имя', value: 'Копосов' },
      { label: 'Фамилия', value: 'Алексей' },
      { label: 'Имя в чате', value: 'Lyoha' },
      { label: 'Телефон', value: '+7 (900) 420 42 37' },
    ]
  }],
  'change-profile-data': [ Pages.ProfileChangePage, {
    fields: [
      { label: 'Почта', type: 'email', value: 'pochta@ya.ru'  },
      { label: 'Логин', type: 'text', value: 'Arkeviz'  },
      { label: 'Имя', type: 'text', value: 'Копосов'  },
      { label: 'Фамилия', type: 'text', value: 'Алексей'  },
      { label: 'Имя в чате', type: 'tel', value: 'Lyoha'  },
      { label: 'Телефон', type: 'tel', value: '+7 (900) 420 42 37'  },
    ]
  }],
  'change-profile-password': [ Pages.ProfilePasswordChangePage, {
    fields: [
      { label: 'Старый пароль', type: 'password' },
      { label: 'Новый пароль', type: 'password' },
      { label: 'Повторите новый пароль', type: 'password', errorMessage: 'Пароли не совпадают' },
    ]
  }],
  'change-avatar': [ Pages.ChangeAvatarDialog ],
  'loaded-file': [ Pages.LoadedFileDialog ],
  'on-load-error': [ Pages.OnLoadErrorDialog ],
  'add-user': [ Pages.AddUserDialog ],
  'delete-user': [ Pages.DeleteUserDialog ],
  'error-404': [ Pages.ErrPage404 ],
  'error-500': [ Pages.ErrPage500 ],
}

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page]
  const container = document.getElementById('app')!

  const getTemplate = Handlebars.compile(source)
  container.innerHTML = getTemplate(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'))

document.addEventListener('click', e => {
  // @ts-ignore
  const page = e.target.getAttribute('data-page')
  if (!page) return

  navigate(page)
  window.scrollTo(0, 0);

  e.preventDefault()
  e.stopImmediatePropagation()
})
