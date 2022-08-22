import { Component } from '../component';
import { wordData } from '../../types/types';
import { baseURL } from '../../constants/api';

export class WordCard extends Component {
  node: HTMLElement;

  imgContainer: HTMLElement;

  img: HTMLImageElement;

  content: HTMLElement;

  wordRow: HTMLElement;

  word: HTMLElement;

  transcr: HTMLElement;

  audio: HTMLElement;

  audioImg: HTMLImageElement;

  translation: HTMLElement;

  meaning: HTMLElement;

  meaningEn: HTMLElement;

  meaningRu: HTMLElement;

  phrase: HTMLElement;

  phraseEn: HTMLElement;

  phraseRu: HTMLElement;

  btnDifficultWord: HTMLButtonElement;

  btnStudiedWord: HTMLButtonElement;

  audioToPlay?: HTMLAudioElement;

  audioArr?: HTMLAudioElement[];

  constructor(data: wordData) {
    super(null);
    this.node = new Component(null, 'div', 'word-cards__item card').node;

    this.imgContainer = new Component(this.node, 'div', 'card__img-container').node;

    this.img = new Component(this.imgContainer, 'img', 'card__img').node as HTMLImageElement;
    this.img.src = `${baseURL}/${data.image}`;

    this.content = new Component(this.node, 'div', 'card__content').node;

    this.word = new Component(this.content, 'p', 'card__word', data.word).node;

    this.wordRow = new Component(this.content, 'div', 'card__word-row').node;

    this.transcr = new Component(this.wordRow, 'p', 'card__transcr', data.transcription).node;

    this.audio = new Component(this.wordRow, 'button', 'card__audio').node;

    this.audioImg = new Component(this.audio, 'img').node as HTMLImageElement;
    this.audioImg.src = './assets/icons/audio.svg';

    this.translation = new Component(this.content, 'p', 'card__translation', data.wordTranslate).node;

    this.meaning = new Component(this.content, 'div', 'card__meaning').node;

    this.meaningEn = document.createElement('div');
    this.meaningEn.classList.add('card__meaning_en');
    this.meaningEn.innerHTML = data.textMeaning;
    this.meaning.append(this.meaningEn);

    this.meaningRu = new Component(this.meaning, 'div', 'card__meaning_ru', data.textMeaningTranslate).node;

    this.phrase = new Component(this.content, 'div', 'card__phrase').node;

    this.phraseEn = document.createElement('div');
    this.phraseEn.classList.add('card__phrase_en');
    this.phraseEn.innerHTML = data.textExample;
    this.phrase.append(this.phraseEn);

    this.phraseRu = new Component(this.phrase, 'div', 'card__phrase_ru', data.textExampleTranslate).node;

    this.btnDifficultWord = document.createElement('button');
    this.btnDifficultWord.classList.add('card__btn', 'card__btn_difficult-btn');
    this.btnDifficultWord.innerHTML = '!';
    this.node.append(this.btnDifficultWord);

    this.btnStudiedWord = document.createElement('button');
    this.btnStudiedWord.classList.add('card__btn', 'card__btn_studied-btn');
    this.btnStudiedWord.innerHTML = '&#10003;';
    this.node.append(this.btnStudiedWord);

    this.audio.addEventListener('click', () => {
      this.playAudio([data.audio, data.audioMeaning, data.audioExample]);
    });
  }

  playAudio(urls: string[]): void {
    this.audioArr = [];

    for (let i = 0; i < urls.length; i += 1) {
      const audio = new Audio(`${baseURL}/${urls[i]}`);
      this.audioArr?.push(audio);
    }

    for (let i = 0; i < urls.length; i += 1) {
      if (i === 0) {
        this.audioArr[i].play();
      } else {
        this.audioArr[i - 1].addEventListener('ended', () => {
          if (this.audioArr) {
            this.audioArr[i].play();
          }
        });
      }
    }
  }
}
