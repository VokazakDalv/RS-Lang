import { baseURL } from '../../constants/api';
import { IResult, wordData } from '../../types/types';
import { Component } from '../component';
import { Levels } from '../levels/levels';
import './audioGame.scss';

export class AudioGame extends Component {
  audioGameContainer = new Component(this.node, 'div', 'audio-game__container');

  gameOverContainer = new Component(this.audioGameContainer.node, 'div', 'audio-game__game-over');

  gameOverClose = new Component(this.gameOverContainer.node, 'div', 'audio-game__game-close');

  gameOverRightAnswers = new Component(this.gameOverContainer.node, 'div', 'audio-game__right');

  rightAnswersInfo = new Component(this.gameOverRightAnswers.node, 'div', 'right-answer__info');

  gameOverWrongAnswers = new Component(this.gameOverContainer.node, 'div', 'audio-game__wrong');

  wrongAnswersInfo = new Component(this.gameOverWrongAnswers.node, 'div', 'wrong-answer__info');

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

  renderData(gameWords: string[], audioSrc: string):void {
    (this.audio.node as HTMLAudioElement).src = `${baseURL}/${audioSrc}`;
    Array.from(this.audioOptions.node.children).forEach((option, i) => {
      if (option.getAttribute('disabled')) {
        option.removeAttribute('disabled');
      }
      (option as HTMLElement).style.backgroundColor = '#fff';
      this.audioControl.node.innerText = 'НЕ ЗНАЮ';
      (this.audioImg.node as HTMLImageElement).src = '';
      this.audioWord.node.innerText = '';
      option.innerHTML = gameWords[i];
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
      this.renderAnswerWord(el);
    });
    const right = this.gameOverRightAnswers.node;
    if (right.children.length > 1) {
      this.rightAnswersInfo.node.innerText = `ВЕРНО (${right.children.length - 1})`;
    }
    const wrong = this.gameOverWrongAnswers.node;
    if (wrong.children.length > 1) {
      this.wrongAnswersInfo.node.innerText = `НЕ ВЕРНО (${wrong.children.length - 1})`;
    }
  }

  renderAnswerWord(word: IResult):void {
    const parent = (word.isRightAnswer) ? this.gameOverRightAnswers.node : this.gameOverWrongAnswers.node;
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
