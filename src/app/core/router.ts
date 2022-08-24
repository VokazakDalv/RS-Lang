import { Href } from '../constants/router-refs';
import { Component } from '../components/component';
import { IRoute } from '../types/interface';
import { MainStartPage } from '../components/main/main';
import { AudioGame } from '../components/audioGame/audiogame';
import { Games } from '../components/games/games';

export const routing: IRoute[] = [
  {
    name: Href.TEXTBOOK,
    component: (): Component => new Component(null, 'main', 'textbook', 'textbook'),
  },
  {
    name: Href.GAMES,
    component: (): Component => new Games(),
  },
  {
    name: Href.SPRINT,
    component: (): Component => new Component(null, 'main', 'spring', 'spring'),
  },
  {
    name: Href.AUDIO,
    component: (): Component => new AudioGame(),
  },
  {
    name: Href.STATS,
    component: (): Component => new Component(null, 'main', 'statistics', 'statistics'),
  },
];

export const defaultRoute = {
  name: Href.MAIN,
  component: (): HTMLElement => new MainStartPage().mainBlock,
};
