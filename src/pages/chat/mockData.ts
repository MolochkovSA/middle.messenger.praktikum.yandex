import { MessageType, Contact, ContactItem, OutgoingMessageStatus } from './types'

export const mockContact: Contact = {
  id: '4',
  name: 'Вадим',
  messagesGroup: [
    {
      date: new Date().toLocaleDateString().slice(0, 5),
      messages: [
        {
          id: '0',
          text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — 
          НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. 
          Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, 
          все тушки этих камер все еще находятся на поверхности Луны, 
          так как астронавты с собой забрали только кассеты с пленкой. 
          Хассельблад в итоге адаптировал SWC для космоса, 
          но что-то пошло не так и на ракету они так никогда и не попали. 
          Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
          date: new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString().slice(0, 5),
          type: MessageType.Incoming,
          read: true,
        },
        {
          id: '1',
          text: 'Изображение',
          date: new Date(Date.now() - 60 * 1000).toLocaleTimeString().slice(0, 5),
          type: MessageType.Incoming,
          read: true,
        },
        {
          id: '2',
          text: 'Круто!',
          date: new Date(Date.now()).toLocaleTimeString().slice(0, 5),
          type: MessageType.Outgoing,
          status: OutgoingMessageStatus.Read,
        },
      ],
    },
  ],
}

export const mockContactsList: ContactItem[] = [
  {
    id: '1',
    name: 'Андрей',
    newMessageCount: 2,
    lastMessage: {
      date: '10:49',
      type: MessageType.Incoming,
      text: 'Изображение',
    },
  },
  {
    id: '2',
    name: 'Киноклуб',
    lastMessage: {
      date: '12:00',
      type: MessageType.Outgoing,
      text: 'Стикер',
    },
  },
  {
    id: '3',
    name: 'Илья',
    newMessageCount: 4,
    lastMessage: {
      date: '15:12',
      type: MessageType.Incoming,
      text: 'Друзья, у меня для вас особенный выпуск новостей! Всё в порядке?',
    },
  },
  {
    id: '4',
    name: 'Вадим',
    lastMessage: {
      date: 'Пт',
      type: MessageType.Outgoing,
      text: 'Круто!',
    },
  },
  {
    id: '5',
    name: 'тет-а-теты',
    lastMessage: {
      date: 'Ср',
      type: MessageType.Incoming,
      text: 'И Human Interface Guidelines и Material Design рекомендуют применять отступы внутри элементов.',
    },
  },
  {
    id: '6',
    name: '1, 2, 3',
    lastMessage: {
      date: 'Пн',
      type: MessageType.Incoming,
      text: 'Миллионы россиян ежедневно проводят десятки часов свое время в интернете.',
    },
  },
  {
    id: '7',
    name: 'Design Destroyer',
    lastMessage: {
      date: 'Пн',
      type: MessageType.Incoming,
      text: 'В 2008 году художник Jon Rafman начал собирать коллекцию интересных историй в интернете.',
    },
  },
  {
    id: '8',
    name: 'Day.',
    lastMessage: {
      date: '1 Мая 2020',
      type: MessageType.Incoming,
      text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир в Яндексе.',
    },
  },
  {
    id: '9',
    name: 'Стас Рогозин',
    lastMessage: {
      date: '12 Апр 2020',
      type: MessageType.Incoming,
      text: 'Можно или сегодня или завтра вечером.',
    },
  },
]
