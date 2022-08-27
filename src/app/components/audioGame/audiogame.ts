import { baseURL } from '../../constants/api';
import { IResult, wordData } from '../../types/types';
import { Component } from '../component';
import { Levels } from '../levels/levels';
import './audioGame.scss';

export class AudioGame extends Component {
  audioGameContainer = new Component(this.node, 'div', 'audio-game__container');

  audioGameOver = new Component(this.audioGameContainer.node, 'div', 'audio-game__game-over');

  audioGameClose = new Component(this.audioGameOver.node, 'div', 'audio-game__game-close');

  audioGameRightAnswers = new Component(this.audioGameOver.node, 'div', 'audio-game__right');

  audioGameWrong = new Component(this.audioGameOver.node, 'div', 'audio-game__right');

  audioGameAnswerContainer = new Component(this.audioGameContainer.node, 'div', 'audio-game__answer-container');

  answerContainerLeft = new Component(this.audioGameAnswerContainer.node, 'div', 'answer-container__left');

  answerContainerRight = new Component(this.audioGameAnswerContainer.node, 'div', 'answer-container__right');

  levels = new Levels(this.audioGameContainer.node, 'АУДИОВЫЗОВ');

  audioPlayBtn = new Component(this.answerContainerLeft.node, 'div', 'audio-game__play-btn');

  audioWord = new Component(this.answerContainerLeft.node, 'div', 'audio-game__word');

  audioImg = new Component(this.answerContainerRight.node, 'img', 'audio-game__img audio-img');

  audioOptions = new Component(this.audioGameContainer.node, 'div', 'audio-game__options');

  audioControl = new Component(this.audioGameContainer.node, 'div', 'audio-game__control', 'не знаю');

  gameLevel = 0;

  audio = new Component(this.audioPlayBtn.node, 'audio', 'audio');

  constructor() {
    super(null, 'main', 'audio-game');

    Array(5).fill('1').forEach(() => {
      this.audioOptions.node.append(new Component(null, 'button', 'audio-game__option').node);
    });
  }

  renderData(gameWords: string[], right: string):void {
    (this.audio.node as HTMLAudioElement).src = `${baseURL}/${right}`;
    Array.from(this.audioOptions.node.children).forEach((el, i) => {
      if (el.getAttribute('disabled')) {
        el.removeAttribute('disabled');
      }
      (el as HTMLElement).style.backgroundColor = '#fff';
      this.audioControl.node.innerText = 'НЕ ЗНАЮ';
      (this.audioImg.node as HTMLImageElement).src = '';
      this.audioWord.node.innerText = '';
      el.innerHTML = gameWords[i];
    });
  }

  renderAnswer(right: wordData, wrong: string):void {
    Array.from(this.audioOptions.node.children).forEach((el) => {
      if (el.innerHTML === right.wordTranslate) {
        (el as HTMLElement).style.backgroundColor = 'green';
      }
      if (wrong && el.innerHTML === wrong) {
        (el as HTMLElement).style.backgroundColor = 'red';
      }
      this.audioControl.node.innerText = 'следующий';
      (this.audioImg.node as HTMLImageElement).src = `${baseURL}/${right.image}`;
      this.audioWord.node.innerText = right.word;

      el.setAttribute('disabled', 'disabled');
    });
  }

  renderResults(gameResults: IResult[]):void {
    gameResults.forEach((el) => {
      if (el.isRightAnswer === true) {
        if (!this.audioGameRightAnswers.node.innerText) this.audioGameRightAnswers.node.innerText = 'ВЕРНО';
        this.renderAnswerWord(el);
      } else {
        if (!this.audioGameWrong.node.innerText) this.audioGameWrong.node.innerText = 'НЕ ВЕРНО';
        this.renderAnswerWord(el);
      }
    });
  }

  renderAnswerWord(word: IResult):void {
    const parent = (word.isRightAnswer) ? this.audioGameRightAnswers.node : this.audioGameWrong.node;
    const container = new Component(parent, 'div', 'audio-game__result-container');
    const audioBtn = new Component(null, 'button', 'audio-game__answer-btn');
    const audioPlay = new Component(audioBtn.node, 'audio');
    (audioPlay.node as HTMLAudioElement).src = `${baseURL}/${word.word?.audio}`;
    audioBtn.node.onclick = () => {
      (audioPlay.node as HTMLAudioElement).play();
    };
    container.node.append(audioBtn.node,
      new Component(null, 'div', 'audio-game__answer-word', `${word.word?.word} - ${word.word?.wordTranslate}`).node);
  }
}
