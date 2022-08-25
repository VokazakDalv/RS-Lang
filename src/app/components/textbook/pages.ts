import { Component } from '../component';

export class TextbookPages extends Component {
  firstPageBtn = new Component(this.node, 'button', 'pages__control', '<<');

  previousPageBtn = new Component(this.node, 'button', 'pages__control', '<');

  pageNumbers = new Component(this.node, 'button', 'pages__numbers');

  nextPageBtn = new Component(this.node, 'button', 'pages__control', '>');

  lastPageBtn = new Component(this.node, 'button', 'pages__control', '>>');

  pages: Component[];

  constructor() {
    super(null, 'div', 'textbook__pages pages');
    this.pages = [];

    for (let i = 1; i <= 30; i++) {
      this.pages.push(new Component(this.node, 'button', 'pages__control', `${i}`));
    }

    this.pages.forEach((page) => {
      this.pageNumbers.node.append(page.node);
    });

    this.hiddenControls(0);
  }

  hiddenControls(currentPage: number): void {
    if (currentPage === 0) {
      this.previousPageBtn.node.classList.add('hidden');
      this.firstPageBtn.node.classList.add('hidden');
    } else {
      this.previousPageBtn.node.classList.remove('hidden');
      this.firstPageBtn.node.classList.remove('hidden');
    }
    if (currentPage === 29) {
      this.nextPageBtn.node.classList.add('hidden');
      this.lastPageBtn.node.classList.add('hidden');
    } else {
      this.nextPageBtn.node.classList.remove('hidden');
      this.lastPageBtn.node.classList.remove('hidden');
    }
    this.pages.forEach((page, index) => {
      if (Math.abs(currentPage - index) <= 2) {
        page.node.classList.remove('hidden');
      } else {
        page.node.classList.add('hidden');
      }
      if (currentPage === index) {
        page.node.classList.add('pages__control_current');
      } else {
        page.node.classList.remove('pages__control_current');
      }
    });
  }
}
