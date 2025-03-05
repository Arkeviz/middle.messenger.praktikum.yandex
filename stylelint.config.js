/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],

  rules: {
    'selector-class-pattern': [
      '^[a-z][a-z0-9-]*(?:__[a-z0-9-]+)*(?:_[a-z0-9-]+)*$',
      {
        message: 'Используй БЭМ: .имя-блока__имя-элемента_имя-модификатора',
      },
    ],
  },
}
