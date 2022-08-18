import { Href } from '../constants/router-refs';
import { Component } from '../components/component';
import { IRoute } from '../types/interface';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { MainStartPage } from '../components/main/main';

export const routing: IRoute[] = [
  {
    name: Href.TEXTBOOK,
    component: (): void => {
      document.body.append(
        new Header().headerBlock,
        new Component(null, 'div', 'textbook', 'textbook').node,
        new Footer().footerBlock,
      );
    },
  },
  {
    name: Href.GAMES,
    component: (): void => {
      document.body.append(new Component(null, 'div', 'games', 'games').node);
    },
  },
  {
    name: Href.SPRINT,
    component: (): void => {
      document.body.append(new Component(null, 'div', 'spring', 'spring').node);
    },
  },
  {
    name: Href.AUDIO,
    component: (): void => {
      document.body.append(new Component(null, 'div', 'audio', 'audio').node);
    },
  },
  {
    name: Href.STATS,
    component: (): void => {
      document.body.append(
        new Header().headerBlock,
        new Component(null, 'div', 'statistics', 'statistics').node,
        new Footer().footerBlock,
      );
    },
  },
];

export const defaultRoute = {
  name: Href.MAIN,
  component: (): void => {
    document.body.append(
      new Header().headerBlock,
      new MainStartPage().mainBlock,
      new Footer().footerBlock,
    );
  },
};
