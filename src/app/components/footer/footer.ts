export class Footer {
  footerBloсk: HTMLElement;

  container: HTMLDivElement;

  year: HTMLParagraphElement;

  developers: HTMLDivElement;

  rssLink: HTMLAnchorElement;

  constructor() {
    this.footerBloсk = document.createElement('footer');
    this.footerBloсk.classList.add('footer');

    this.container = document.createElement('div');
    this.container.classList.add('footer__container', 'container');

    this.year = document.createElement('p');
    this.year.classList.add('footer__year');
    this.year.textContent = '© 2022';

    this.developers = document.createElement('div');
    this.developers.classList.add('footer__developers');

    this.developers.innerHTML = `        <a href="https://github.com/VokazakDalv">VokazakDalv</a>
    <a href="https://github.com/Kasitsyn">Kasitsyn</a>
    <a href="https://github.com/daanikeeva">daanikeeva</a>
    `;

    this.rssLink = document.createElement('a');
    this.rssLink.classList.add('footer__rss-link');
    this.rssLink.href = 'https://rs.school/js/';
    this.rssLink.innerHTML = '<img class="footer__logo-rss" src="./assets/icons/rss.svg" alt="">';

    this.container.append(this.year, this.developers, this.rssLink);

    this.footerBloсk.append(this.container);
  }
}
