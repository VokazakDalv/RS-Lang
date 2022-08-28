import { Component } from '../component';

// function delay(value: number) {
//   return new Promise((r) => {
//     setTimeout(r, value);
//   });
// }

export class Timer extends Component {
  container = new Component(this.node, 'div', 'timer__container').node;

  counter = 30;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'timer');

    const intervalId = setInterval(() => {
      this.counter -= 1;
      this.container.innerHTML = `${this.counter}`;
      if (this.counter === 0) clearInterval(intervalId);
    }, 1000);
  }

  // async doTimer() {
  //   for (let i = 0; i < this.counter; i++) {
  //     // eslint-disable-next-line no-await-in-loop
  //     await delay(1000);
  //     this.counter -= 1;
  //     console.log(this.counter);
  //   }
  // }
}
