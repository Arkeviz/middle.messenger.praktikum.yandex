import { TChat } from '../types/chats.ts'

export const mockChats: TChat[] = [
  {
    id: 111,
    title: 'Андрей',
    avatar: '/kad-avatar.jpg',
    unread_count: 2,
    created_by: 12345,
    last_message: {
      user: {
        first_name: 'Пёсь',
        second_name: 'Гавкошмыглов',
        avatar: '/kad-avatar.jpg',
        email: 'gavgavich@woof.bark',
        login: 'MrGoodBoy',
        phone: '+77777777777',
      },
      time: '2025-01-02T14:22:22.000Z',
      content: 'Вуф-вуф!',
    },
  },
  {
    id: 222,
    title: 'Киноклуб',
    avatar: '',
    unread_count: 0,
    created_by: 12333,
    last_message: {
      user: {
        first_name: 'Алексей',
        second_name: 'Копосов',
        avatar: '/kad-avatar.jpg',
        email: 'pochta@ya.ru',
        login: 'Arkeviz',
        phone: '+79004204237',
      },
      time: '2024-03-10T13:31:44.000Z',
      content: 'Тут такое...',
    },
  },
  {
    id: 444,
    title: 'Вадим',
    avatar: null,
    unread_count: 0,
    created_by: 77777,
    last_message: {
      user: {
        first_name: 'Алексей',
        second_name: 'Копосов',
        avatar: '/kad-avatar.jpg',
        email: 'pochta@ya.ru',
        login: 'Arkeviz',
        phone: '+79004204237',
      },
      time: '2025-05-11T15:51:37.000Z',
      content: 'Круто!',
    },
  },
  {
    id: 333,
    title: 'Илья',
    avatar: null,
    unread_count: 4,
    created_by: 54321,
    last_message: {
      user: {
        first_name: 'Илья',
        second_name: 'Градич',
        avatar: null,
        email: 'ilay@mail.ru',
        login: 'Ilushaa',
        phone: '+79004204237',
      },
      time: '2025-05-07T13:31:44.000Z',
      content:
        'Друзья, у меня для вас особенный выпуск новостей! Тут ваще очень много текста, вот прям очень... А инфы-то, охохохо',
    },
  },
]
