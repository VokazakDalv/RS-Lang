import { Component } from '../component';
import { getWord } from '../../API/textbook';
import { WordCard } from '../wordCard/wordCard';
import { IWord } from '../../types/interface';
import { TextbookGroups } from './groups';

import './textbook.scss';

export class Textbook extends Component {
  textbookGroups = new TextbookGroups();

  textbookCards?: Component;

  group = 0;

  page = 0;

  word: Promise<IWord[]>;

  constructor() {
    super(null, 'main', 'textbook container');
    this.word = getWord(this.group, this.page);
    this.node.append(this.textbookGroups.node);
    if (!localStorage.length) {
      this.textbookGroups.group[6].node.setAttribute('disabled', 'disabled');
    }
    this.handlerGroupButtons();
    this.fillCards();
  }

  handlerGroupButtons(): void {
    this.textbookGroups.group.forEach((group, index) => {
      group.node.addEventListener('click', () => {
        this.textbookCards?.destroy();
        this.group = index;
        this.word = getWord(this.group, this.page);
        this.fillCards();
      });
    });
  }

  fillCards():void {
    this.textbookCards = new Component(this.node, 'div', 'textbook__cards');
    this.word.then((resp) => {
      resp.forEach((el: IWord) => {
        this.textbookCards?.node.append(new WordCard(el).node);
      });
    })
      .catch((er) => console.log(er));
  }
}
