import { Component } from '../component';
import { baseURL } from '../../constants/api';
import { IWord } from '../../types/interface';
import {
  createUserWord, deleteUserWord, getUserWord,
} from '../../API/wordCard';
import { LoginResponse, wordDifficult } from '../../types/types';

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

  authData = JSON.parse(localStorage.authData);

  id: string;

  wordDifficult: wordDifficult;

  userWord: Promise<wordDifficult | null>;

  wordDifficulty?: string;

  constructor(data: IWord) {
    super(null, 'div', 'word-cards__item card');

    this.id = data.id;

    this.wordDifficult = {
      difficulty: 'hard',
      optional: {},
    };

    (this.img.node as HTMLImageElement).src = `${baseURL}/${data.image}`;

    this.word.node.textContent = data.word;

    this.transcr.node.textContent = data.transcription;

    (this.audioImg.node as HTMLImageElement).src = './assets/icons/audio.svg';

    this.translation.node.textContent = data.wordTranslate;

    this.meaningEn.node.innerHTML = data.textMeaning;

    this.meaningRu.node.innerHTML = data.textMeaningTranslate;

    this.phraseEn.node.innerHTML = data.textExample;
    this.phraseRu.node.innerHTML = data.textExampleTranslate;

    this.userWord = getUserWord(this.authData.userId, this.id);

    this.userWord.then((resp) => {
      if (resp) {
        this.wordDifficulty = resp.difficulty;
        if (this.wordDifficulty === 'hard') {
          this.btnDifficultWord?.node.classList.add('checked');
        } else if (this.wordDifficulty === 'studied') {
          this.btnStudiedWord?.node.classList.add('checked');
        }
      }
    });

    if (this.authData) {
      this.btnDifficultWord = new Component(this.imgContainer.node, 'button', 'card__btn card__btn_difficult-btn', '!');

      this.btnStudiedWord = new Component(this.imgContainer.node, 'button', 'card__btn card__btn_studied-btn');
      this.btnStudiedWord.node.innerHTML = '&#10003;';
    }

    this.audioUrls = [data.audio, data.audioMeaning, data.audioExample];

    this.boundHandler = this.playAudio.bind(this, this.audioUrls);

    this.handlerAudioBtn();
    this.switchWordHard();
    this.switchWordStudied();
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

  switchWordHard(): void {
    this.btnDifficultWord?.node.addEventListener('click', () => {
      const authData: LoginResponse = JSON.parse(localStorage.authData);
      const userWord = {
        userId: authData.userId,
        wordId: this.id,
        word: this.wordDifficult,
      };
      if (!this.btnDifficultWord?.node.classList.contains('checked')) {
        this.btnDifficultWord?.node.classList.add('checked');
        this.btnStudiedWord?.node.classList.remove('checked');
        createUserWord(userWord);
      } else {
        this.btnDifficultWord?.node.classList.remove('checked');
        deleteUserWord(this.authData.userId, this.id);
      }
    });
  }

  switchWordStudied(): void {
    this.btnStudiedWord?.node.addEventListener('click', () => {
      const authData: LoginResponse = JSON.parse(localStorage.authData);
      this.wordDifficult = {
        difficulty: 'studied',
        optional: {},
      };
      const userWord = {
        userId: authData.userId,
        wordId: this.id,
        word: this.wordDifficult,
      };
      if (!this.btnStudiedWord?.node.classList.contains('checked')) {
        this.btnStudiedWord?.node.classList.add('checked');
        this.btnDifficultWord?.node.classList.remove('checked');
        createUserWord(userWord);
      } else {
        this.btnStudiedWord?.node.classList.remove('checked');
        deleteUserWord(this.authData.userId, this.id);
      }
    });
  }
}
