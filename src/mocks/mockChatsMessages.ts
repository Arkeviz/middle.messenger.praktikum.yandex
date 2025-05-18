import type { TChatData } from '../types/chats.ts'
import { EMessageTypes } from '../types/chats.ts'

export const mockChatsMessages: TChatData[] = [
  {
    id: 444,
    title: 'Вадим',
    avatar: null,
    unread_count: null,
    messages: [
      {
        id: 111,
        content:
          'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        type: EMessageTypes.MESSAGE,
        user: {
          first_name: 'Вадим',
          second_name: 'Чирипчип',
          avatar: null,
          email: 'gavgavich@woof.bark',
          login: 'vavaka',
        },
        time: '2025-05-10T11:55:22.000Z',
      },
      {
        id: 112,
        content: '/kad-avatar.jpg',
        type: EMessageTypes.IMAGE,
        user: {
          first_name: 'Вадим',
          second_name: 'Чирипчип',
          avatar: null,
          email: 'gavgavich@woof.bark',
          login: 'vavaka',
        },
        time: '2025-05-10T11:56:44.000Z',
      },
      {
        id: 113,
        content: 'Круто!',
        type: EMessageTypes.MESSAGE,
        user: {
          first_name: 'Алексей',
          second_name: 'Копосов',
          avatar: '/kad-avatar.jpg',
          email: 'pochta@ya.ru',
          login: 'Arkeviz',
        },
        time: '2025-05-10T12:00:44.000Z',
      },
    ],
  },
  {
    id: 111,
    title: 'Андрей',
    avatar: '/kad-avatar.jpg',
    unread_count: 2,
    messages: [
      {
        id: 112,
        content: 'Ты умеешь говорить?',
        type: EMessageTypes.MESSAGE,
        user: {
          first_name: 'Алексей',
          second_name: 'Копосов',
          avatar: '/kad-avatar.jpg',
          email: 'pochta@ya.ru',
          login: 'Arkeviz',
        },
        time: '2024-12-31T11:00:44.000Z',
      },
      {
        id: 113,
        content: 'Вуф-вуф!',
        type: EMessageTypes.MESSAGE,
        user: {
          first_name: 'Пёсь',
          second_name: 'Гавкошмыглов',
          avatar: '/kad-avatar.jpg',
          email: 'gavgavich@woof.bark',
          login: 'vavaka',
        },
        time: '2025-01-02T13:56:59.000Z',
      },
    ],
  },
]
