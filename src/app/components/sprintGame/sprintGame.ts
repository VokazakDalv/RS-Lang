import { wordData } from '../../types/types';
import { Component } from '../component';
import { GameResult } from '../gameResult/gameResult';
import { Levels } from '../levels/levels';
import { Timer } from '../timer/timer';
import './sprint.scss';
import { getWords } from '../../api/API';
import { shuffle } from '../../api/utils';

export class SprintGame extends Component {
  sprintGameContainer = new Component(
    this.node,
    'div',
    'sprint-game__container',
    'Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за 30 секунд',
  ).node;

  gameResult = new GameResult(this.sprintGameContainer, 'div', 'result__container');

  levels = new Levels(this.sprintGameContainer, 'СПРИНТ');

  gameLevel = 0;

  // timer: Timer;

  wordsData: Promise<wordData[]>;

  wordsWrapper: Component<HTMLElement>;

  word: HTMLElement;

  wordAnswer: HTMLElement;

  gap: HTMLElement;

  timerContainer: HTMLElement;

  rightBtn: HTMLElement;

  wrongBtn: HTMLElement;

  buttonsWrapper: HTMLElement;

  correctAnswer: boolean;

  constructor() {
    super(null, 'main', 'sprint-game');
    this.correctAnswer = false;
    this.timerContainer = new Component(this.sprintGameContainer, 'div', 'timer-container').node;
    this.wordsWrapper = new Component(
      this.sprintGameContainer,
      'div',
      'sprint-game__words-wrapper',
    );
    this.word = new Component(this.wordsWrapper.node, 'p', 'sprint-game__word').node;
    this.gap = new Component(this.wordsWrapper.node, 'p', 'sprint-game__word', '=').node;
    this.wordAnswer = new Component(this.wordsWrapper.node, 'p', 'sprint-game__word').node;
    this.buttonsWrapper = new Component(
      this.sprintGameContainer,
      'div',
      'sprint-game__btn-wrapper',
    ).node;
    this.wordsData = getWords();
    this.rightBtn = new Component(
      this.buttonsWrapper,
      'button',
      'btn sprint-game__rightBtn',
      'ДА',
    ).node;
    this.wrongBtn = new Component(
      this.buttonsWrapper,
      'button',
      'sprint-game__wrongBtn btn',
      'НЕТ',
    ).node;

    this.controlsHandlers();
  }

  async render() {
    this.wordsData = getWords(this.gameLevel.toString(), '0');
    const words = (await this.wordsData).map((el) => el);
    const answers = (await this.wordsData).map((el) => el.wordTranslate);
    if (document.querySelector('.timer')) {
      document.querySelector('.timer')?.remove();
    }
    const timer = new Timer(this.timerContainer);
    shuffle(words);
    shuffle(answers);
    if (words) {
      const word = words.pop();
      this.word.innerHTML = `${word?.word}`;
      this.wordAnswer.innerHTML = `${answers[0]}`;
      this.correctAnswer = word?.word === answers[0];
    }
  }

  controlsHandlers() {
    this.rightBtn.addEventListener('click', () => {
      if (this.correctAnswer) {
        this.render();
      }
    });

    this.wrongBtn.addEventListener('click', () => {
      if (!this.correctAnswer) {
        this.render();
      }
    });
  }
}
