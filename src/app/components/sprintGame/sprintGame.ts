import { Component } from '../component';
import { GameResult } from '../gameResult/gameResult';
import { Levels } from '../levels/levels';
import { Timer } from '../timer/timer';
import './sprint.scss';
import { getWords } from '../../API/API';
import { shuffle } from '../../API/utils';
import { IResult, IWord } from '../../types/types';

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

  wordsWrapper: HTMLElement;

  word: HTMLElement;

  comparedWord: HTMLElement;

  gap: HTMLElement;

  timerContainer: HTMLElement;

  rightBtn: HTMLElement;

  wrongBtn: HTMLElement;

  buttonsWrapper: HTMLElement;

  correctAnswer: boolean;

  rightAnswers: Array<IWord | undefined | null>;

  wrongAnswers: Array<IWord | undefined | null>;

  currentWord!: IWord | undefined | null;

  audio!: Component<HTMLElement>;

  audioPlayBtn!: Component<HTMLElement>;

  page = localStorage.page ? Number(localStorage.page) : 0;

  resultsContainer!: HTMLElement;

  resultsTitle!: HTMLElement;

  gameResults: IResult[] = [];

  wordsData!: Promise<IWord[]>;

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
    this.gap = new Component(this.wordsWrapper, 'p', 'sprint-game__word', ' ?? ').node;
    this.comparedWord = new Component(this.wordsWrapper, 'p', 'sprint-game__word').node;
    this.buttonsWrapper = new Component(
      this.sprintGameContainer,
      'div',
      'sprint-game__btn-wrapper',
    ).node;

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
    this.gameResult.resultClose.node.onclick = () => {
      window.location.hash = '#games';
    };
  }

  async run() {
    const timer = document.querySelector('.timer__container');
    if (timer) {
      if (timer?.innerHTML <= '0') {
        this.renderResults();
      }
    }

    this.compareWords();
  }

  controlsHandlers(): void {
    document.onkeydown = (e) => {
      // eslint-disable-next-line default-case
      switch (e.key) {
        case 'ArrowLeft':
          if (this.correctAnswer && this.currentWord) {
            this.gameResults.push({
              isRightAnswer: true,
              word: this.currentWord,
            });
          } else if (this.currentWord) {
            this.gameResults.push({
              isRightAnswer: false,
              word: this.currentWord,
            });
          }
          this.rightBtn.classList.toggle('sprint-game__rightBtn--active');
          setTimeout(() => {
            this.rightBtn.classList.toggle('sprint-game__rightBtn--active');
          }, 200);
          if (this.currentWord) this.run();
          break;
        case 'ArrowRight':
          if (!this.correctAnswer && this.currentWord) {
            this.gameResults.push({
              isRightAnswer: true,
              word: this.currentWord,
            });
          } else if (this.currentWord) this.wrongAnswers?.push(this.currentWord);
          this.wrongBtn.classList.toggle('sprint-game__wrongBtn--active');
          setTimeout(() => {
            this.wrongBtn.classList.toggle('sprint-game__wrongBtn--active');
          }, 200);
          if (this.currentWord) this.run();
          break;
      }
    };
    this.rightBtn.addEventListener('click', () => {
      if (this.correctAnswer && this.currentWord) {
        this.gameResults.push({
          isRightAnswer: true,
          word: this.currentWord,
        });
      } else if (this.currentWord) {
        this.gameResults.push({
          isRightAnswer: false,
          word: this.currentWord,
        });
      }
      if (this.currentWord) this.run();
    });

    this.wrongBtn.addEventListener('click', () => {
      if (!this.correctAnswer && this.currentWord) {
        this.gameResults.push({
          isRightAnswer: true,
          word: this.currentWord,
        });
      } else if (this.currentWord) {
        this.gameResults.push({
          isRightAnswer: false,
          word: this.currentWord,
        });
      }
      if (this.currentWord) this.run();
    });
  }

  startTimer(): void {
    const timer = new Timer(this.timerContainer);
  }

  renderResults(): void {
    console.log(this.gameResults);
    this.gameResult.node.classList.add('result__container_active');
    this.gameResult.renderResults(this.gameResults);
    this.gameResults = [];
  }

  async compareWords() {
    if (!(await this.wordsData)) this.wordsData = getWords(this.gameLevel, this.page);
    else if (!(await this.wordsData).length) {
      this.page++;
      this.wordsData = getWords(this.gameLevel, this.page);
    }

    const wordTranslations = (await this.wordsData).map((el) => el.wordTranslate);
    shuffle(wordTranslations);
    if (!(await this.wordsData).length) this.renderResults();
    this.currentWord = (await this.wordsData).pop();
    if (!this.currentWord) this.renderResults();
    this.word.innerHTML = `${this.currentWord?.word}`;

    const randomNumber = Math.floor(Math.random() * (wordTranslations.length - 1));
    this.comparedWord.innerHTML = `${wordTranslations[randomNumber]}`;
    this.correctAnswer = this.currentWord?.wordTranslate === wordTranslations[randomNumber];
  }
}
