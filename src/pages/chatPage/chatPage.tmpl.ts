import Handlebars from 'handlebars'

import './components'
import rightChevronIcon from '../../../static/chevronRight.svg'

import styles from './chatPage.module.scss'

type ChatPageProps = {}

const chatPage = `
<main class=${styles.chatPage}>
  <nav class=${styles.navbar}>
    {{#> Link id="errorPageLink" path="#" className="${styles.link}" data-page="/error404"}}
      <span>Профиль</span> 
      <img src=${rightChevronIcon} class=${styles.icon} alt="chevronRight">
    {{/ Link}}

    {{> SearchInput id="searchInput" value=value className="${styles.search}"}}
    
    <ul>
      {{> ContactItem id=1 name="Андрей" date="10:49" messageType="incoming" message="Изображение" newMessageCount=2}}
      {{> ContactItem id=2 name="Киноклуб" date="12:00" messageType="outgoing" message="Стикер"}}
      {{> ContactItem id=3 name="Илья" date="15:12" messageType="incoming" message="Друзья, у меня для вас особенный выпуск новостей! Всё в порядке?" newMessageCount=4}}
      {{> ContactItem id=4 name="Вадим" date="Пт" messageType="outgoing" message="Круто!"}}
      {{> ContactItem id=5 name="тет-а-теты" date="Ср" messageType="incoming" message="И Human Interface Guidelines и Material Design рекомендуют применять отступы внутри элементов."}}
      {{> ContactItem id=6 name="1, 2, 3" date="Пн" messageType="incoming" message="Миллионы россиян ежедневно проводят десятки часов свое время в интернете."}}
      {{> ContactItem id=7 name="Design Destroyer" date="Пн" messageType="incoming" message="В 2008 году художник Jon Rafman начал собирать коллекцию интересных историй в интернете."}}
      {{> ContactItem id=8 name="Day." date="1 Мая 2020" messageType="incoming" message="Так увлёкся работой по курсу, что совсем забыл его анонсир в Яндексе."}}
      {{> ContactItem id=9 name="Стас Рогозин" date="12 Апр 2020" messageType="incoming" message="Можно или сегодня или завтра вечером."}}    
    </ul>
  </nav>

  <div class=${styles.content}>
   {{> ContactChat}}
  </div>
</main>
`

export const ChatPage = Handlebars.compile<ChatPageProps>(chatPage)
