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

  wordsWrapper: HTMLElement;

  word: HTMLElement;

  comparedWord: HTMLElement;

  gap: HTMLElement;

  timerContainer: HTMLElement;

  rightBtn: HTMLElement;

  wrongBtn: HTMLElement;

  buttonsWrapper: HTMLElement;

  correctAnswer: boolean;

  rightAnswers: Array<wordData | undefined | null>;

  wrongAnswers: Array<wordData | undefined | null>;

  currentWord: wordData | undefined | null;

  constructor() {
    super(null, 'main', 'sprint-game');
    this.correctAnswer = false;
    this.rightAnswers = [];
    this.wrongAnswers = [];
    this.currentWord = null;
    this.timerContainer = new Component(this.sprintGameContainer, 'div', 'timer-container').node;
    this.wordsWrapper = new Component(
      this.sprintGameContainer,
      'div',
      'sprint-game__words-wrapper',
    ).node;

    this.word = new Component(this.wordsWrapper, 'p', 'sprint-game__word').node;
    this.gap = new Component(this.wordsWrapper, 'p', 'sprint-game__word', '=').node;
    this.comparedWord = new Component(this.wordsWrapper, 'p', 'sprint-game__word').node;
    this.buttonsWrapper = new Component(
      this.sprintGameContainer,
      'div',
      'sprint-game__btn-wrapper',
    ).node;
    this.wordsData = getWords(this.gameLevel.toString(), '0');
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

  run() {
    const timer = document.querySelector('.timer__container');
    if (timer?.innerHTML === '25') {
      this.renderResults();
    }

    this.compareWords();
  }

  controlsHandlers(): void {
    this.rightBtn.addEventListener('click', () => {
      if (this.correctAnswer) {
        this.rightAnswers?.push(this.currentWord);
      } else this.wrongAnswers?.push(this.currentWord);
      this.run();
    });

    this.wrongBtn.addEventListener('click', () => {
      if (!this.correctAnswer) {
        this.rightAnswers?.push(this.currentWord);
      } else this.wrongAnswers?.push(this.currentWord);
      this.run();
    });
  }

  startTimer(): void {
    const timer = new Timer(this.timerContainer);
  }

  renderResults(): void {
    this.sprintGameContainer.innerHTML = '';
    this.wordsWrapper = new Component(
      this.sprintGameContainer,
      'div',
      'sprint-game__words-wrapper',
      'ВЫ ЗНАЕТЕ ЭТИ СЛОВА:',
    ).node;
    this.rightAnswers.forEach((answer) => {
      this.word = new Component(this.wordsWrapper, 'p', 'sprint-game__word').node;
      if (answer?.word) this.word.append(answer.word);
    });
    this.wordsWrapper = new Component(
      this.sprintGameContainer,
      'div',
      'sprint-game__words-wrapper',
      'ЭТИ СЛОВА НУЖНО ПОДУЧИТЬ:',
    ).node;
    this.wrongAnswers.forEach((answer) => {
      this.word = new Component(this.wordsWrapper, 'p', 'sprint-game__word').node;
      if (answer?.word) this.word.append(answer.word, ' ', answer.transcription, ' - ', answer.wordTranslate);
    });
  }

  async compareWords() {
    this.wordsData = getWords(this.gameLevel.toString(), '0');
    const words = (await this.wordsData).map((el) => el);
    const wordTranslations = (await this.wordsData).map((el) => el.wordTranslate);
    shuffle(words);
    shuffle(wordTranslations);
    if (words) {
      this.currentWord = words.pop();
      this.word.innerHTML = `${this.currentWord?.word}`;
      this.comparedWord.innerHTML = `${wordTranslations[0]}`;
      this.correctAnswer = this.currentWord?.word === wordTranslations[0];
    }
  }
}
