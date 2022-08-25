import { Component } from '../component';

export class TextbookGroups extends Component {
  group: Component[];

  constructor() {
    super(null, 'div', 'textbook__groups');
    this.group = [];

    for (let i = 1; i <= 7; i++) {
      if (i === 7) {
        this.group.push(new Component(this.node, 'button', 'textbook__group btn', 'Сложные слова'));
      } else {
        this.group.push(new Component(this.node, 'button', 'textbook__group btn', `Раздел ${i}`));
      }
    }
  }
}
