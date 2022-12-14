import { baseURL } from '../../constants/api';
import { IWord } from '../../types/types';
import { Component } from '../component';
import { GameResult } from '../gameResult/gameResult';
import { Levels } from '../levels/levels';
import './audioGame.scss';

export class AudioGame extends Component {
  audioGameContainer = new Component(this.node, 'div', 'audio-game__container');

  gameResult = new GameResult(this.audioGameContainer.node, 'div', 'result__container');

  audioGameAnswerContainer = new Component(this.audioGameContainer.node, 'div', 'audio-game__answer-container');

  answerContainerLeft = new Component(this.audioGameAnswerContainer.node, 'div', 'answer-container__left');

  answerContainerRight = new Component(this.audioGameAnswerContainer.node, 'div', 'answer-container__right');

  levels = (localStorage.getItem('audio-start-place') === 'games')
    ? (new Levels(this.audioGameContainer.node, 'АУДИОВЫЗОВ')) : null;

  audioPlayBtn = new Component(this.answerContainerLeft.node, 'div', 'audio-game__play-btn');

  audioWord = new Component(this.answerContainerLeft.node, 'div', 'audio-game__word');

  audioImg = new Component(this.answerContainerRight.node, 'img', 'audio-game__img audio-img');

  audioOptions = new Component(this.audioGameContainer.node, 'div', 'audio-game__options');

  audioControl = new Component(this.audioGameContainer.node, 'div', 'audio-game__control', 'не знаю');

  gameLevel = 0;

  audio = new Component(this.audioPlayBtn.node, 'audio', 'audio');

  audioPlay = new Component(this.node, 'audio');

  constructor() {
    super(null, 'main', 'audio-game');

    Array(5).fill('1').forEach(() => {
      this.audioOptions.node.append(new Component(null, 'button', 'audio-game__option').node);
    });
  }

  renderData(gameWords: string[], audioSrc: string):void {
    (this.audio.node as HTMLAudioElement).src = `${baseURL}/${audioSrc}`;
    Array.from(this.audioOptions.node.children).forEach((option, i) => {
      if (option.getAttribute('disabled')) {
        option.removeAttribute('disabled');
      }
      (option as HTMLElement).style.backgroundColor = '#8D5CF6';
      this.audioControl.node.innerText = 'НЕ ЗНАЮ';
      (this.audioImg.node as HTMLImageElement).src = '';
      this.audioWord.node.innerText = '';
      option.innerHTML = `${i + 1} ${gameWords[i]}`;
    });
  }

  renderAnswer(right: IWord, wrong: string):void {
    Array.from(this.audioOptions.node.children).forEach((el) => {
      if (el.innerHTML.slice(2) === right.wordTranslate) {
        (el as HTMLElement).style.backgroundColor = '#ad65c8';
      }
      if (wrong && el.innerHTML.slice(2) === wrong) {
        (el as HTMLElement).style.backgroundColor = '#ff7b52';
      }
      this.audioControl.node.innerText = 'следующий';
      (this.audioImg.node as HTMLImageElement).src = `${baseURL}/${right.image}`;
      this.audioWord.node.innerText = right.word;
      el.setAttribute('disabled', 'disabled');
    });
  }
}
