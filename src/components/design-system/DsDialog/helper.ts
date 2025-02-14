import Handlebars from 'handlebars'

Handlebars.registerHelper('dialogTitleClass', (value) =>
  value ? 'ds-dialog__title_error' : '',
)
