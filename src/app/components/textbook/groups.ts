import { Component } from '../component';

export class TextbookGroups extends Component {
  group: Component[];

  constructor() {
    super(null, 'div', 'textbook__groups');
    this.group = [];

    for (let i = 1; i <= 7; i++) {
      if (i === 7) {
        this.group.push(new Component(this.node, 'button', `textbook__group textbook__group_${i}`, 'Сложные слова'));
      } else {
        this.group.push(new Component(this.node, 'button', `textbook__group textbook__group_${i}`, `Раздел ${i}`));
      }
    }
  }

  selectCurrentGroup(index: number): void {
    this.group.forEach((group, ind) => {
      if (index === ind) {
        group.node.classList.add('textbook__group_current');
      } else {
        group.node.classList.remove('textbook__group_current');
      }
    });
  }
}
