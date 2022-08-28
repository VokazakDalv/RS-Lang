import { Component } from '../component';
import { GameResult } from '../gameResult/gameResult';
import { Levels } from '../levels/levels';
import { Timer } from '../timer/timer';
import './sprint.scss';

export class SprintGame extends Component {
  sprintGameContainer = new Component(this.node, 'div', 'sprint-game__container', 'SPRINT').node;

  gameResult = new GameResult(this.sprintGameContainer, 'div', 'result__container');

  levels = new Levels(this.sprintGameContainer, 'СПРИНТ');

  gameLevel = 0;

  timer: Timer;

  constructor() {
    super(null, 'main', 'sprint-game');

    this.timer = new Timer(this.sprintGameContainer);
  }

  render() {
    console.log(this.gameLevel);
  }
}
