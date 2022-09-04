import { Component } from '../component';
import './timer.scss';

export class Timer extends Component {
  container = new Component(this.node, 'div', 'timer__container').node;

  counter = 31;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'timer');

    const intervalId = setInterval(() => {
      this.counter -= 1;
      this.container.innerHTML = `${this.counter}`;
      if (this.counter === 0) clearInterval(intervalId);
    }, 1000);
  }
}
