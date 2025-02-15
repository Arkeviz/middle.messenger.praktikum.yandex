import './assets/scss/normalize.css'
import './assets/fonts/fonts.scss'
import './assets/scss/main.scss'

import Handlebars from 'handlebars'
import * as Components from './components'
import * as Layouts from './layouts'
import * as Pages from './pages'

import registerJSON from './mocks/register.json'
import profileJSON from './mocks/profile.json'
import changeProfileDataJSON from './mocks/change-profile-data.json'
import changeProfilePasswordJSON from './mocks/change-profile-password.json'
import emptyChatJSON from './mocks/chats.json'

const AppPartials = [...Object.entries(Layouts), ...Object.entries(Components)]

AppPartials.forEach(([name, template]) => {
  Handlebars.registerPartial(name, template)
})

const pages = {
  login: [Pages.LoginPage],
  nav: [Pages.NavPage],
  register: [Pages.RegisterPage, registerJSON],
  profile: [Pages.ProfilePage, profileJSON],
  'change-profile-data': [Pages.ProfileChangePage, changeProfileDataJSON],
  'change-profile-password': [
    Pages.ProfilePasswordChangePage,
    changeProfilePasswordJSON,
  ],
  'empty-chat': [Pages.EmptyChatPage, emptyChatJSON],
  'change-avatar': [Pages.ChangeAvatarDialog],
  'loaded-file': [Pages.LoadedFileDialog],
  'on-load-error': [Pages.OnLoadErrorDialog],
  'add-user': [Pages.AddUserDialog],
  'delete-user': [Pages.DeleteUserDialog],
  'error-404': [Pages.ErrPage404],
  'error-500': [Pages.ErrPage500],
}

function navigate(page: string) {
  // @ts-ignore
  const [source, context] = pages[page]
  const container = document.getElementById('app')!

  const getTemplate = Handlebars.compile(source)
  container.innerHTML = getTemplate(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'))

document.addEventListener('click', (e) => {
  // @ts-ignore
  const page = e.target.getAttribute('data-page')
  if (!page) return

  navigate(page)
  window.scrollTo(0, 0)

  e.preventDefault()
  e.stopImmediatePropagation()
})
