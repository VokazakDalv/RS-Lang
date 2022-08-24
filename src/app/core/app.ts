import { AudioGame } from '../components/audioGame/audiogame';
import { Component } from '../components/component';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { routing, defaultRoute } from './router';

export class App {
  enableRouteChange = (): void => {
    let main: Component;
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      if (!document.body.children.length) {
        document.body.append(new Header().headerBlock, new Footer().footerBlock);
      } else {
        main.node.remove();
      }

      if (currentRoute) {
        main = currentRoute.component();
      } else if (defaultRoute) {
        main.node = defaultRoute.component();
      }
      document.body.lastElementChild?.before(main.node);

      if (currentRouteName === 'games/audio') {
        const audioGame = main as AudioGame;
        audioGame.levels.onLevel = (level) => {
          audioGame.levels.destroy();
          audioGame.gameLevel = level;
          audioGame.renderData();
          return level;
        };
      }
    };

    const popstateEvent = new Event('popstate');
    window.dispatchEvent(popstateEvent);
  };
}
