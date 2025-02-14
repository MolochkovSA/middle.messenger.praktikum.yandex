import defaultAvatar from '../../../../../static/avatar.png'

import threeDotsVertical from '../../../../../static/threeDotsVertical.svg'
import paperclip from '../../../../../static/paperclip.svg'
import arrowBtn from '../../../../../static/arrowBtn.svg'

import styles from './contactChat.module.scss'

export const ContactChat = `
  <div class=${styles.chat}>
    <header class=${styles.header}>
      <img src=${defaultAvatar} class=${styles.avatar} alt="avatar">
      <h2>Вадим</h2>
      <button class=${styles.dropdownMenuBtn}>
        <img src=${threeDotsVertical} class=${styles.icon} alt="threeDotsVertical">
      </button>
    </header>

    <main class=${styles.messages}>
      <section class=${styles.messagesSection}>
        <h3 class=${styles.date}>19 июня</h3>

        <artcicle class="${styles.message} ${styles.incoming}">
          <p class=${styles.text}>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
          <time class=${styles.time}>12:30</time>
        </artcicle>

        <artcicle class="${styles.message} ${styles.outgoing}">
          <p class=${styles.text}>Привет!</p>
          <time class=${styles.time}>12:30</time>
        </artcicle>

      </section>
    </main>

    <footer class=${styles.footer}>
      <button class=${styles.addAttachmentBtn}>
        <img src=${paperclip} class=${styles.icon} alt="paperclip">
      </button>

      {{> Input id=id type="text" name="message" placeholder="Сообщение" className="${styles.input}" value=value}}

      <button class=${styles.sendBtn}>
        <img src=${arrowBtn} class=${styles.icon} alt="arrowBtn">
      </button>
    </footer>
  </div>
`
