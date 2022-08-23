import { Component } from '../component';
import './audioGame.scss';

export class AudioGame extends Component {
  audioGameContainer = new Component(this.node, 'div', 'audio-game__container');

  audioPlayBtn = new Component(this.audioGameContainer.node, 'div', 'audio-game__play-btn');

  audioOptions = new Component(this.audioGameContainer.node, 'div', 'audio-game__options');

  audioControl = new Component(this.audioGameContainer.node, 'div', 'audio-game__control', 'не знаю');

  constructor() {
    super(null, 'main', 'audio-game');

    Array(5).fill('1').forEach(() => {
      this.audioOptions.node.append(new Component(null, 'div', 'audio-game__option').node);
    });
  }
}
