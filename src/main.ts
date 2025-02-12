import Handlebars from 'handlebars'
import * as Components from './components'
import * as Layouts from './layouts'
import * as Pages from './pages'

Handlebars.registerHelper(
  'isButtonIcon',
  (value) => value == 'icon'
)
Handlebars.registerHelper(
  'dialogClass',
  (value) => !!value ? 'ds-dialog__title_error' : ''
)

const AppPartials = [...Object.entries(Layouts), ...Object.entries(Components)]

AppPartials.forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template)
})

const pages = {
  'login': [ Pages.LoginPage ],
  'nav': [ Pages.NavPage ],
  'register': [ Pages.RegisterPage ],
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

  e.preventDefault()
  e.stopImmediatePropagation()
})
