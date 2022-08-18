export class Header {
  _headerBlock: HTMLElement;
  wrapper: HTMLDivElement;
  logo: HTMLElement;
  menu: HTMLElement;
  menuList: HTMLUListElement;
  menuMain: HTMLLIElement;
  linkMain: HTMLAnchorElement;
  menuBook: HTMLLIElement;
  linkBook: HTMLAnchorElement;
  menuGames: HTMLLIElement;
  linkGames: HTMLAnchorElement;
  menuStatistic: HTMLLIElement;
  linkStatistic: HTMLAnchorElement;
  loginBtn: HTMLButtonElement;

  constructor() {
    this._headerBlock = document.createElement('header');
    this._headerBlock.classList.add('header', 'container');

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('header__wrapper');

    this.logo = document.createElement('h1');
    this.logo.classList.add('header__logo');
    this.logo.textContent = 'RS-Lang';

    this.menu = document.createElement('nav');
    this.menu.classList.add('header__menu', 'menu');

    this.menuList = document.createElement('ul');
    this.menuList.classList.add('menu__list');

    this.menuMain = document.createElement('li');
    this.menuMain.classList.add('menu__item');

    this.linkMain = document.createElement('a');
    this.linkMain.classList.add('menu__link');
    this.linkMain.textContent = 'Главная';

    this.menuMain.append(this.linkMain);

    this.menuBook = document.createElement('li');
    this.menuBook.classList.add('menu__item');

    this.linkBook = document.createElement('a');
    this.linkBook.classList.add('menu__link');
    this.linkBook.textContent = 'Учебник';

    this.menuBook.append(this.linkBook);

    this.menuGames = document.createElement('li');
    this.menuGames.classList.add('menu__item');

    this.linkGames = document.createElement('a');
    this.linkGames.classList.add('menu__link');
    this.linkGames.textContent = 'Мини-игры';

    this.menuGames.append(this.linkGames);

    this.menuStatistic = document.createElement('li');
    this.menuStatistic.classList.add('menu__item');

    this.linkStatistic = document.createElement('a');
    this.linkStatistic.classList.add('menu__link');
    this.linkStatistic.textContent = 'Мини-игры';

    this.menuStatistic.append(this.linkStatistic);

    this.menuList.append(
      this.menuMain,
      this.menuBook,
      this.menuGames,
      this.menuStatistic
    )

    this.menu.append(this.menuList);

    this.loginBtn = document.createElement('button');
    this.loginBtn.classList.add('header__btn', 'btn', 'login-btn');
    this.loginBtn.textContent = 'Войти';

    this.wrapper.append(this.logo, this.menu, this.loginBtn);
    this._headerBlock.append(this.wrapper);
  }

  get headerBlock() {
    return this._headerBlock;
  }
}
