import { Href } from '../constants/router-refs';
import { Component } from '../components/component';
import { IRoute } from '../types/interface';
import { MainStartPage } from '../components/main/main';

export const routing: IRoute[] = [
  {
    name: Href.TEXTBOOK,
    component: (): HTMLElement => new Component(null, 'main', 'textbook', 'textbook').node,
  },
  {
    name: Href.GAMES,
    component: (): HTMLElement => new Component(null, 'main', 'games', 'games').node,
  },
  {
    name: Href.SPRINT,
    component: (): HTMLElement => new Component(null, 'main', 'spring', 'spring').node,
  },
  {
    name: Href.AUDIO,
    component: (): HTMLElement => new Component(null, 'main', 'audio', 'audio').node,
  },
  {
    name: Href.STATS,
    component: (): HTMLElement => new Component(null, 'main', 'statistics', 'statistics').node,
  },
];

export const defaultRoute = {
  name: Href.MAIN,
  component: (): HTMLElement => new MainStartPage().mainBlock,
};
