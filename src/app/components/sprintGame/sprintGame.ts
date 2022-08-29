import { wordData } from '../../types/types';
import { Component } from '../component';
import { GameResult } from '../gameResult/gameResult';
import { Levels } from '../levels/levels';
import { Timer } from '../timer/timer';
import './sprint.scss';
import { getWords } from '../../api/API';

export class SprintGame extends Component {
  sprintGameContainer = new Component(this.node, 'div', 'sprint-game__container', 'SPRINT').node;

  gameResult = new GameResult(this.sprintGameContainer, 'div', 'result__container');

  levels = new Levels(this.sprintGameContainer, 'СПРИНТ');

  gameLevel = 0;

  timer: Timer;

  wordsData: Promise<wordData[]>;

  constructor() {
    super(null, 'main', 'sprint-game');

    this.timer = new Timer(this.sprintGameContainer);

    this.wordsData = getWords('0', '0');
  }

  async render() {
    console.log(await this.wordsData);
  }
}
