import { Component } from '../component';
import { baseURL } from '../../constants/api';
import { IWord } from '../../types/interface';
import { createUserWord, deleteUserWord, getUserWord } from '../../API/wordCard';
import { wordDifficult } from '../../types/types';

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

  audioArr?: HTMLAudioElement[];

  boundHandlerPlayAudio: () => void;

  authData = JSON.parse(localStorage.authData);

  id: string;

  wordDifficult?: wordDifficult;

  userWord: Promise<wordDifficult | null>;

  wordDifficulty?: string;

  audioWord: HTMLAudioElement;

  audioMeaning: HTMLAudioElement;

  audioExample: HTMLAudioElement;

  constructor(data: IWord) {
    super(null, 'div', 'word-cards__item card');

    this.id = data.id;

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

    this.switchWordDifficultyBtn();

    if (this.authData) {
      this.btnDifficultWord = new Component(this.imgContainer.node, 'button', 'card__btn card__btn_difficult-btn', '!');

      this.btnStudiedWord = new Component(this.imgContainer.node, 'button', 'card__btn card__btn_studied-btn');
      this.btnStudiedWord.node.innerHTML = '&#10003;';
    }

    this.audioWord = new Audio(`${baseURL}/${data.audio}`);
    this.audioMeaning = new Audio(`${baseURL}/${data.audioMeaning}`);
    this.audioExample = new Audio(`${baseURL}/${data.audioExample}`);

    this.boundHandlerPlayAudio = this.playAudio.bind(this);

    this.handlerAudioBtn();

    this.btnDifficultWord?.node.addEventListener('click', () => this.switchWordHard(
      this.btnDifficultWord!,
      'hard',
    ));
    this.btnStudiedWord?.node.addEventListener('click', () => this.switchWordHard(
      this.btnStudiedWord!,
      'studied',
    ));
  }

  handlerAudioBtn(): void {
    this.audio.node.addEventListener('click', this.boundHandlerPlayAudio);
  }

  playAudio(): void {
    this.audioWord.play();
    this.audioWord.addEventListener('ended', () => {
      this.audioMeaning.play();
    });
    this.audioMeaning.addEventListener('ended', () => {
      this.audioExample.play();
    });
  }

  switchWordDifficultyBtn(): void {
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
  }

  switchWordHard(btn: Component, diff: string): void {
    this.wordDifficult = {
      difficulty: diff,
      optional: {},
    };

    const userWord = {
      userId: this.authData.userId,
      wordId: this.id,
      word: this.wordDifficult,
    };

    if (!btn.node.classList.contains('checked')) {
      this.btnStudiedWord?.node.classList.remove('checked');
      this.btnDifficultWord?.node.classList.remove('checked');
      btn.node.classList.add('checked');
      createUserWord(userWord);
    } else {
      btn.node.classList.remove('checked');
      deleteUserWord(this.authData.userId, this.id);
    }
  }
}
