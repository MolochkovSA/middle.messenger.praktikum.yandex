import { MessageType, Contact } from '../types'

export const users: Contact[] = [
  {
    id: '1',
    name: 'Андрей',
    messages: [
      {
        id: '0',
        text: 'проверка связи',
        date: Date.now() - 2 * 60 * 1000,
        messageType: MessageType.Incoming,
        viewed: true,
      },
      {
        id: '1',
        text: 'Привет',
        date: Date.now() - 60 * 1000,
        messageType: MessageType.Incoming,
        viewed: false,
      },
      {
        id: '2',
        text: 'Изображение',
        date: Date.now(),
        messageType: MessageType.Incoming,
        viewed: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Киноклуб',
    messages: [
      {
        id: '3',
        text: 'Стикер',
        date: Date.now() - 10 * 60 * 1000,
        messageType: MessageType.Outgoing,
      },
    ],
  },
  {
    id: '3',
    name: 'Илья',
    messages: [
      {
        id: '4',
        text: 'Я',
        date: Date.now() - 55 * 60 * 1000,
        messageType: MessageType.Incoming,
        viewed: false,
      },
      {
        id: '5',
        text: 'хочу',
        date: Date.now() - 54 * 60 * 1000,
        messageType: MessageType.Incoming,
        viewed: false,
      },
      {
        id: '6',
        text: 'сказать',
        date: Date.now() - 53 * 60 * 1000,
        messageType: MessageType.Incoming,
        viewed: false,
      },
      {
        id: '7',
        text: 'Друзья, у меня для вас особенный выпуск новостей! Всё в порядке?',
        date: Date.now() - 52 * 60 * 1000,
        messageType: MessageType.Incoming,
        viewed: false,
      },
    ],
  },
]
