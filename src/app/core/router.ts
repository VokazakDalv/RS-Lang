import { Href } from '../constants/router-refs';
import { Component } from '../components/component';
import { IRoute } from '../types/interface';

export const routing: IRoute[] = [
  {
    name: Href.TEXTBOOK,
    component: (): void => {
      document.body.append(
        new Component(null, 'header', 'header', 'header').node,
        new Component(null, 'div', 'textbook', 'textbook').node,
        new Component(null, 'footer', 'footer', 'footer').node,
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
        new Component(null, 'header', 'header', 'header').node,
        new Component(null, 'div', 'statistics', 'statistics').node,
        new Component(null, 'footer', 'footer', 'footer').node,
      );
    },
  },
  {
    name: Href.TEAM,
    component: (): void => {
      document.body.append(
        new Component(null, 'header', 'header', 'header').node,
        new Component(null, 'div', 'team', 'team').node,
        new Component(null, 'footer', 'footer', 'footer').node,
      );
    },
  },
];

export const defaultRoute = {
  name: Href.MAIN,
  component: (): void => {
    document.body.append(
      new Component(null, 'header', 'header', 'header').node,
      new Component(null, 'div', 'start', 'start').node,
      new Component(null, 'footer', 'footer', 'footer').node,
    );
  },
};
