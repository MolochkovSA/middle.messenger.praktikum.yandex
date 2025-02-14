import Handlebars from 'handlebars'

import { Chat, ChatProps } from './chat.tmpl'
import { ContactItem, MessageType } from './types'

export const ChatPage = () => {
  const state: ChatProps = {
    contacts,
  }

  return Handlebars.compile<ChatProps>(Chat)(state)
}

const contacts: ContactItem[] = [
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
