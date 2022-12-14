import { Component } from '../component';
import './games.scss';

export class Games extends Component {
  sprintBtnContainer = new Component(this.node, 'div', 'games__sprint-container');

  titleContainer = new Component(this.node, 'div', 'games__title-container');

  audioBtnContainer = new Component(this.node, 'div', 'games__audio-container');

  audio = new Component(this.audioBtnContainer.node, 'a', 'games__btn');

  audioSpan = new Component(this.audio.node, 'span', 'games__btn-span audio', 'АУДИО');

  sprint = new Component(this.sprintBtnContainer.node, 'a', 'games__btn sprint');

  sprintSpan = new Component(this.sprint.node, 'span', 'games__btn-span', 'СПРИНТ');

  gamesCard = new Component(this.titleContainer.node, 'div', 'games__card');

  gamesTitle = new Component(this.gamesCard.node, 'h3', 'games__card-title', 'ИГРЫ');

  constructor() {
    super(null, 'main', 'games');
    (this.audio.node as HTMLImageElement).setAttribute('href', '#games/audio');
    (this.audio.node as HTMLImageElement).setAttribute('style', '--clr:#8d5cf6; --i:0;');
    (this.sprint.node as HTMLImageElement).setAttribute('href', '#games/sprint');
    (this.sprint.node as HTMLImageElement).setAttribute('style', '--clr:#8d5cf6; --i:0;');
    this.sprintHandler();
    this.audioHandler();
  }

  sprintHandler():void {
    this.sprint.node.addEventListener('click', () => {
      localStorage.removeItem('group');
    });
  }

  audioHandler():void {
    this.audio.node.addEventListener('click', () => {
      localStorage.setItem('audio-start-place', 'games');
    });
  }
}
