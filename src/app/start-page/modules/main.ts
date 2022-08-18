export class MainStartPage {
  mainBloсk: HTMLElement;

  constructor() {
    this.mainBloсk = document.createElement('main');
    this.mainBloсk.classList.add('main');
    this.mainBloсk.innerHTML = `
    <section class="section greeting">
    <div class="greeting__container container">
      <h2 class="greeting__title">RS-Lang</h2>
      <p class="greeting__text">Открой для себя быстрый и интересный способ выучить английский язык!</p>
      <button class="greeting__btn btn login-btn">Войти</button>
    </div>
  </section>
  <section class="section advantages container">
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
  </section>
  <section class="section developers container">
    <h2 class="section-title">О команде</h2>
    <div class="developers__row">
      <div class="developers__card">
        <img class="developers__photo" src="./assets/images/maxim.jpg" alt="">
        <h5 class="developers__name">Максим</h5>
        <p class="developers__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It</p>
        <a class="developers__link" href="https://github.com/VokazakDalv">
          <img src="./assets/icons/github-logo.svg" alt="">
        </a>
      </div>
      <div class="developers__card">
        <img class="developers__photo" src="./assets/images/yura.jpg" alt="">
        <h5 class="developers__name">Юрий</h5>
        <p class="developers__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It</p>
        <a class="developers__link" href="https://github.com/Kasitsyn">
          <img src="./assets/icons/github-logo.svg" alt="">
        </a>
      </div>
      <div class="developers__card">
        <img class="developers__photo" src="./assets/images/dasha.jpg" alt="">
        <h5 class="developers__name">Дарья</h5>
        <p class="developers__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It</p>
        <a class="developers__link" href="https://github.com/VokazakDalv">
          <img src="./assets/icons/github-logo.svg" alt="">
        </a>
      </div>
    </div>
  </section>
`;
  }
}