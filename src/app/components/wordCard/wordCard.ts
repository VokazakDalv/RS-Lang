import { Component } from '../component';
import { baseURL } from '../../constants/api';
import { IWord } from '../../types/interface';

export class WordCard extends Component {
  imgContainer = new Component(this.node, 'div', 'card__img-container');

  img = new Component(this.imgContainer.node, 'img', 'card__img');

  content = new Component(this.node, 'div', 'card__content');

  word = new Component(this.content.node, 'p', 'card__word');

  wordRow = new Component(this.content.node, 'div', 'card__word-row');

  transcr = new Component(this.wordRow.node, 'p', 'card__transcr');

  audio = new Component(this.wordRow.node, 'button', 'card__audio');

  audioImg = new Component(this.audio.node, 'img');

  translation = new Component(this.content.node, 'p', 'card__translation');

  meaning = new Component(this.content.node, 'div', 'card__meaning');

  meaningEn = new Component(this.meaning.node, 'div', 'card__meaning_en');

  meaningRu = new Component(this.meaning.node, 'div', 'card__meaning_ru');

  phrase = new Component(this.content.node, 'div', 'card__phrase');

  phraseEn = new Component(this.phrase.node, 'div', 'card__phrase_en');

  phraseRu = new Component(this.phrase.node, 'div', 'card__phrase_ru');

  btnDifficultWord?: Component;

  btnStudiedWord?: Component;

  audioUrls: string[];

  audioArr?: HTMLAudioElement[];

  boundHandler: () => void;

  constructor(data: IWord) {
    super(null, 'div', 'word-cards__item card');

    (this.img.node as HTMLImageElement).src = `${baseURL}/${data.image}`;

    this.word.node.textContent = data.word;

    this.transcr.node.textContent = data.transcription;

    (this.audioImg.node as HTMLImageElement).src = './assets/icons/audio.svg';

    this.translation.node.textContent = data.wordTranslate;

    this.meaningEn.node.innerHTML = data.textMeaning;

    this.meaningRu.node.innerHTML = data.textMeaningTranslate;

    this.phraseEn.node.innerHTML = data.textExample;
    this.phraseRu.node.innerHTML = data.textExampleTranslate;

    if (localStorage.length) {
      this.btnDifficultWord = new Component(this.imgContainer.node, 'button', 'card__btn card__btn_difficult-btn', '!');
      this.btnStudiedWord = new Component(this.imgContainer.node, 'button', 'card__btn card__btn_studied-btn');
      this.btnStudiedWord.node.innerHTML = '&#10003;';
    }

    this.audioUrls = [data.audio, data.audioMeaning, data.audioExample];

    this.boundHandler = this.playAudio.bind(this, this.audioUrls);

    this.handlerAudioBtn();
  }

  handlerAudioBtn(): void {
    (this.audio.node as HTMLButtonElement).disabled = false;
    this.audio.node.addEventListener('click', this.boundHandler);
  }

  removeHandlerAudioBtn(): void {
    (this.audio.node as HTMLButtonElement).disabled = true;
    this.audio.node.removeEventListener('click', this.boundHandler);
  }

  playAudio(urls: string[]): void {
    this.audioArr = urls.map((url) => new Audio(`${baseURL}/${url}`));
    this.removeHandlerAudioBtn();
    this.audioArr.forEach((audio, index, arr) => {
      if (index === 0) {
        audio.play();
      } else {
        arr[index - 1].addEventListener('ended', () => {
          audio.play();
        });
      }
      if (index === 2) {
        arr[2].addEventListener('ended', () => {
          this.handlerAudioBtn();
        });
      }
    });
  }
}
