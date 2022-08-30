import { Href } from '../constants/router-refs';
import { Component } from '../components/component';
import { IRoute } from '../types/interface';
import { MainStartPage } from '../components/main/main';
import { Textbook } from '../components/textbook/textbook';
import { Games } from '../components/games/games';

export const routing: IRoute[] = [
  {
    name: Href.TEXTBOOK,
    component: (): HTMLElement => new Textbook().node,
  },
  {
    name: Href.GAMES,
    component: (): HTMLElement => new Games().node,
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
