import Handlebars from 'handlebars'

Handlebars.registerHelper('activeChatClass', (value) =>
  value ? 'chat-item-wrapper_active' : '',
)
