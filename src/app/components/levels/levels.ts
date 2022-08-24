import { Component } from '../component';
import './levels.scss';

export class Levels extends Component {
  levelsContainer = new Component(this.node, 'div', 'levels__container');

  gameName = new Component(this.levelsContainer.node, 'div', 'levels__game-name');

  levelsInfo = new Component(this.levelsContainer.node, 'div', 'levels__info', 'укажите уровень сложности');

  levelsOptions = new Component(this.levelsContainer.node, 'div', 'levels__options');

  onLevel = (level:number): number => level;

  constructor(parentNode: HTMLElement, gameName: string) {
    super(parentNode, 'main', 'levels');

    this.gameName.node.innerText = gameName;
    Array(6).fill('1').forEach((el, i) => {
      const levelsOption = new Component(null, 'div', 'levels__option', `${i + 1}`);
      this.levelsOptions.node.append(levelsOption.node);
      levelsOption.node.onclick = () => this.onLevel(+levelsOption.node.innerText);
    });
  }
}
