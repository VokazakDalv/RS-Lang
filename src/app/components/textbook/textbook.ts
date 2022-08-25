import { Component } from '../component';
import { getWord } from '../../API/textbook';
import { WordCard } from '../wordCard/wordCard';
import { IWord } from '../../types/interface';
import { TextbookGroups } from './groups';
import { TextbookPages } from './pages';

export class Textbook extends Component {
  textbookGroups = new TextbookGroups();

  textbookCards?: Component;

  textbookPages = new TextbookPages();

  group = localStorage.group ? Number(localStorage.group) : 0;

  page = localStorage.page ? Number(localStorage.page) : 0;

  word: Promise<IWord[]>;

  constructor() {
    super(null, 'main', 'textbook container');
    this.word = getWord(this.group, this.page);
    this.node.append(this.textbookGroups.node);
    if (!localStorage.authData) {
      this.textbookGroups.group[6].node.setAttribute('disabled', 'disabled');
    }
    this.handlerGroupButtons();
    this.textbookCards = new Component(this.node, 'div', 'textbook__cards');
    this.fillCards();
    this.node.append(this.textbookPages.node);
    this.handlerPageControls();
    this.textbookPages.hiddenControls(this.page);
  }

  handlerGroupButtons(): void {
    this.textbookGroups.group.forEach((group, index) => {
      group.node.addEventListener('click', () => {
        this.group = index;
        this.page = 0;
        this.textbookPages.hiddenControls(this.page);
        localStorage.setItem('group', this.group.toString());
        localStorage.setItem('page', this.page.toString());
        this.word = getWord(this.group, this.page);
        this.fillCards();
      });
    });
  }

  handlerPageControls(): void {
    this.textbookPages.pages.forEach((page, index) => {
      page.node.addEventListener('click', () => {
        this.page = index;
        localStorage.setItem('page', this.page.toString());
        this.textbookPages.hiddenControls(this.page);
        this.word = getWord(this.group, this.page);
        this.fillCards();
      });
    });
  }

  fillCards():void {
    if (this.textbookCards) {
      this.textbookCards.node.innerHTML = '';
    }
    this.word.then((resp) => {
      resp.forEach((el: IWord) => {
        this.textbookCards?.node.append(new WordCard(el).node);
      });
    })
      .catch((er) => console.log(er));
  }
}
