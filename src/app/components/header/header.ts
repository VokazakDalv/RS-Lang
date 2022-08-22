import { Href } from '../../constants/router-refs';
import { isAuth, loginBtnHandler, logoutBtnHandler } from './controls';

export class Header {
  headerBlock: HTMLElement;

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

  logoutBtn: HTMLButtonElement;

  menuBurger: HTMLDivElement;

  overlay: HTMLDivElement;

  constructor() {
    this.headerBlock = document.createElement('header');
    this.headerBlock.classList.add('header');

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('header__wrapper', 'container');

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
    this.linkMain.setAttribute('href', `#${Href.MAIN}`);

    this.menuMain.append(this.linkMain);

    this.menuBook = document.createElement('li');
    this.menuBook.classList.add('menu__item');

    this.linkBook = document.createElement('a');
    this.linkBook.classList.add('menu__link');
    this.linkBook.textContent = 'Учебник';
    this.linkBook.setAttribute('href', `#${Href.TEXTBOOK}`);

    this.menuBook.append(this.linkBook);

    this.menuGames = document.createElement('li');
    this.menuGames.classList.add('menu__item');

    this.linkGames = document.createElement('a');
    this.linkGames.classList.add('menu__link');
    this.linkGames.textContent = 'Мини-игры';
    this.linkGames.setAttribute('href', `#${Href.GAMES}`);

    this.menuGames.append(this.linkGames);

    this.menuStatistic = document.createElement('li');
    this.menuStatistic.classList.add('menu__item');

    this.linkStatistic = document.createElement('a');
    this.linkStatistic.classList.add('menu__link');
    this.linkStatistic.textContent = 'Статистика';
    this.linkStatistic.setAttribute('href', `#${Href.STATS}`);

    this.menuStatistic.append(this.linkStatistic);

    this.menuList.append(
      this.menuMain,
      this.menuBook,
      this.menuGames,
      this.menuStatistic,
    );

    this.overlay = document.createElement('div');
    this.overlay.classList.add('menu__overlay');

    this.menu.append(this.overlay, this.menuList);

    this.menuBurger = document.createElement('div');
    this.menuBurger.classList.add('header__burger');
    this.menuBurger.innerHTML = '<span></span>';

    this.loginBtn = document.createElement('button');
    this.loginBtn.classList.add('header__btn', 'btn', 'login-btn');
    this.loginBtn.textContent = 'Войти';

    this.logoutBtn = document.createElement('button');
    this.logoutBtn.classList.add('header__btn', 'btn', 'logout-btn');
    this.logoutBtn.textContent = 'Выйти';
    this.logoutBtn.hidden = true;
    this.wrapper.append(this.logo, this.menu, this.loginBtn, this.logoutBtn, this.menuBurger);

    this.headerBlock.append(this.wrapper);

    window.onload = () => {
      if (isAuth()) {
        this.logoutBtn.hidden = false;
        this.loginBtn.hidden = true;
      }
      loginBtnHandler();
      logoutBtnHandler();
    };
  }
}

// const iconMenu = document.querySelector('.header__burger');
// const menuList = document.querySelector('.menu__list');
// const nav = document.querySelector('.menu');

// function closeMenu() {
//   if (iconMenu!.classList.contains('open') && menuList!.classList.contains('open')) {
//     document.body.classList.remove('lock');
//     menuList!.classList.remove('open');
//     iconMenu!.classList.remove('open');
//   }
// }

// iconMenu!.addEventListener('click', () => {
//   document.body.classList.toggle('lock');
//   menuList!.classList.toggle('open');
//   iconMenu!.classList.toggle('open');
// });

// nav!.addEventListener('click', (event) => {
//   const { target } = event;
//   if (target === iconMenu
//         || (<HTMLElement> target).classList.contains('menu__link')
//         || !(<HTMLElement> target).closest('.menu__list')) {
//     closeMenu();
//   }
// });
