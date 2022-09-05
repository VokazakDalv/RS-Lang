export class MainStartPage {
  mainBlock: HTMLElement;

  constructor() {
    this.mainBlock = document.createElement('main');
    this.mainBlock.classList.add('main');
    this.mainBlock.innerHTML = `

    <section class="greeting">
    <div class="greeting__container container">
      <h2 class="greeting__title">RS-Lang</h2>
      <p class="greeting__text">Открой для себя быстрый и интересный способ выучить английский язык!</p>
    </div>
  </section>
  <section class="section advantages container">
  <div class="container">
    <h2 class="section-title">Как изучать английский вместе с RS-Lang?</h2>
    <div class="advantages__row">
      <div class="advantages__item">
        <div class="advantages__img">
          <img class="advantages__icon" src="./assets/icons/book-icon.svg" alt="">
        </div>
        <h3 class="advantages__title">Изучай слова</h3>
        <p class="advantages__text">В учебнике представлены 3600 часто употребляемых
        английских слов, начиная с самых простых и популярных</p>
      </div>
      <div class="advantages__item">
        <div class="advantages__img">
          <img class="advantages__icon" src="./assets/icons/game-icon.svg" alt="">
        </div>
        <h3 class="advantages__title">Повторяй, играя</h3>
        <p class="advantages__text">Мини-игры "Спринт" и "Аудиовызов" помогут быстрее
        запомнить перевод слов и воспринимать их на слух</p>
      </div>
      <div class="advantages__item">
        <div class="advantages__img">
          <img class="advantages__icon" src="./assets/icons/hand-icon.svg" alt="">
        </div>
        <h3 class="advantages__title">Акцент на сложные слова</h3>
        <p class="advantages__text">Ты можешь отметить сложные для тебя слова, чтобы знать,
        на что чаще обращать внимание</p>
      </div>
      <div class="advantages__item">
        <div class="advantages__img">
          <img class="advantages__icon" src="./assets/icons/progress-icon.svg" alt="">
        </div>
        <h3 class="advantages__title">Поддерживай мотивацию</h3>
        <p class="advantages__text">Твои успехи за день / все время в статистике не дадут сдаться на пол пути!</p>
      </div>
    </div>
    </div>
  </section>
  <section class="section developers">
    <div class="container">
    <h2 class="section-title">О команде</h2>
    <div class="developers__row">
      <div class="developers__card">
        <img class="developers__photo" src="./assets/image/maxim.jpg" alt="">
        <h5 class="developers__name">Максим</h5>
        <p class="developers__text">Тимлид, подготовил сборку и бэкенд к работе, настроил роутинг страниц, собрал приложение воедино, разработал игру аудио-вызов</p>
        <a class="developers__link" href="https://github.com/VokazakDalv">
          <img src="./assets/icons/github-logo.svg" alt="">
          VokazakDalv
        </a>
      </div>
      <div class="developers__card">
        <img class="developers__photo" src="./assets/image/yura.jpg" alt="">
        <h5 class="developers__name">Юрий</h5>
        <p class="developers__text">Взял на себя всю работу по авторизации пользователей, разработал игру Спринт</p>
        <a class="developers__link" href="https://github.com/Kasitsyn">
          <img src="./assets/icons/github-logo.svg" alt="">
          Kasitsyn
        </a>
      </div>
      <div class="developers__card">
        <img class="developers__photo" src="./assets/image/dasha.jpg" alt="">
        <h5 class="developers__name">Дарья</h5>
        <p class="developers__text">Реализовала и оформила главную страницу сайта, разработала раздел Учебник; идейный вдохновитель по дизайну приложения</p>
        <a class="developers__link" href="https://github.com/daanikeeva">
          <img src="./assets/icons/github-logo.svg" alt="">
          daanikeeva
        </a>
      </div>
      </div>
    </div>
  </section>
`;
  }
}
