import { Component } from '../component';
import { getWord } from '../../API/textbook';
import { WordCard } from '../wordCard/wordCard';
import { IWord } from '../../types/interface';
import { TextbookGroups } from './groups';
import { TextbookPages } from './pages';

export class Textbook extends Component {
  textbookGroups = new TextbookGroups();

  textbookGameLinks: Component<HTMLElement>;

  sprintGameBtn: Component<HTMLElement>;

  audioGameBtn: Component<HTMLElement>;

  textbookCards?: Component;

  textbookPages = new TextbookPages();

  group = localStorage.group ? Number(localStorage.group) : 0;

  page = localStorage.page ? Number(localStorage.page) : 0;

  word: Promise<IWord[]>;

  textbookCardsEl?: WordCard[];

  descriptionGameLinks: Component<HTMLElement>;

  authData = JSON.parse(localStorage.authData);

  difficultWords?: string[];

  constructor() {
    super(null, 'main', 'textbook container');
    this.word = getWord(this.group, this.page);
    this.node.append(this.textbookGroups.node);
    if (!localStorage.authData) {
      this.textbookGroups.group[6].node.style.visibility = 'hidden';
    }
    this.handlerGroupButtons();
    this.textbookGroups.selectCurrentGroup(this.group);

    this.textbookGameLinks = new Component(this.node, 'div', 'textbook__game-links');

    this.sprintGameBtn = new Component(
      this.textbookGameLinks.node,
      'button',
      'textbook__sprint-game btn',
      'Sprint-game',
    );

    this.descriptionGameLinks = new Component(
      this.textbookGameLinks.node,
      'p',
      'textbook__game-descr',
      'Проверить знания',
    );

    this.audioGameBtn = new Component(this.textbookGameLinks.node, 'button', 'textbook__audio-game btn', 'Audio-game');

    this.textbookCards = new Component(this.node, 'div', 'textbook__cards');
    this.fillCards();
    this.node.append(this.textbookPages.node);
    this.handlerPageControls();
    this.handlerFirstPageControl();
    this.handlerLastPageControl();
    this.textbookPages.switchPageControls(this.page);

    this.deactivateAllCards();
  }

  handlerGroupButtons(): void {
    this.textbookGroups.group.forEach((group, index) => {
      group.node.addEventListener('click', () => {
        this.group = index;
        this.page = 0;
        localStorage.setItem('group', this.group.toString());
        localStorage.setItem('page', this.page.toString());
        this.textbookGroups.selectCurrentGroup(this.group);
        this.refreshTextbookPage();
      });
    });
  }

  handlerPageControls(): void {
    this.textbookPages.pages.forEach((page, index) => {
      page.node.addEventListener('click', () => {
        this.page = index;
        localStorage.setItem('page', this.page.toString());
        this.refreshTextbookPage();
      });
    });
  }

  handlerFirstPageControl(): void {
    this.textbookPages.firstPageBtn.node.addEventListener('click', () => {
      this.page = 0;
      localStorage.setItem('page', this.page.toString());
      this.refreshTextbookPage();
    });
  }

  handlerLastPageControl(): void {
    this.textbookPages.lastPageBtn.node.addEventListener('click', () => {
      this.page = 29;
      localStorage.setItem('page', this.page.toString());
      this.refreshTextbookPage();
    });
  }

  fillCards():void {
    if (this.textbookCards) {
      this.textbookCards.node.innerHTML = '';
    }
    this.word.then((resp) => {
      this.textbookCardsEl = resp.map((el: IWord) => new WordCard(el));
      this.textbookCardsEl.forEach((card: Component) => {
        this.textbookCards?.node.append(card.node);
      });
      this.textbookCardsEl.forEach((card: WordCard) => {
        card.audioWord.addEventListener('play', this.deactivateAllCards.bind(this));
        card.audioExample.addEventListener('ended', this.activateAllCards.bind(this));
      });
    })
      .catch((er) => console.log(er));
  }

  refreshTextbookPage(): void {
    this.textbookPages.switchPageControls(this.page);
    this.word = getWord(this.group, this.page);
    this.fillCards();
  }

  private deactivateAllCards() {
    this.textbookCardsEl?.forEach((card) => {
      (card.audio.node as HTMLButtonElement).disabled = true;
    });
  }

  private activateAllCards() {
    this.textbookCardsEl?.forEach((card) => {
      (card.audio.node as HTMLButtonElement).disabled = false;
    });
  }
}
