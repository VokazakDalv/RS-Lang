import { baseURL } from '../../constants/api';
import { IResult } from '../../types/types';
import { Component } from '../component';
import './gameResult.scss';

export class GameResult extends Component {
  resultClose = new Component(this.node, 'div', 'result__close');

  resultRightAnswers = new Component(this.node, 'div');

  resultWrongAnswers = new Component(this.node, 'div');

  rightAnswersAmount = new Component(this.resultRightAnswers.node, 'div', 'right-answers__amount');

  wrongAnswersAmount = new Component(this.resultWrongAnswers.node, 'div', 'wrong-answers__amount');

  renderResults(gameResults: IResult[]):void {
    gameResults.forEach((word) => {
      this.renderAnswerWord(word);
    });
    const right = this.resultRightAnswers.node;
    if (right.children.length > 1) {
      this.rightAnswersAmount.node.innerText = `ВЕРНО УГАДАНЫ: (${right.children.length - 1})`;
    }
    const wrong = this.resultWrongAnswers.node;
    if (wrong.children.length > 1) {
      this.wrongAnswersAmount.node.innerText = `НУЖНО ПОВТОРИТЬ: (${wrong.children.length - 1})`;
    }
  }

  renderAnswerWord(word: IResult):void {
    const parent = (word.isRightAnswer) ? this.resultRightAnswers.node : this.resultWrongAnswers.node;
    const container = new Component(parent, 'div', 'result__result-container');
    const audioBtn = new Component(null, 'button', 'result__answer-btn');
    const audioPlay = new Component(audioBtn.node, 'audio');
    (audioPlay.node as HTMLAudioElement).src = `${baseURL}/${word.word?.audio}`;
    audioBtn.node.onclick = () => {
      (audioPlay.node as HTMLAudioElement).play();
    };
    container.node.append(audioBtn.node,
      new Component(null, 'div', 'audio-game__answer-word', `${word.word?.word} - ${word.word?.wordTranslate}`).node);
  }
}
