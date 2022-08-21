import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { routing, defaultRoute } from './router';

export class App {
  enableRouteChange = (): void => {
    let main: HTMLElement;
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      if (!document.body.children.length) {
        document.body.append(new Header().headerBlock, new Footer().footerBlock);
      } else {
        main.remove();
      }

      if (currentRoute) {
        main = currentRoute.component();
      } else if (defaultRoute) {
        main = defaultRoute.component();
      }
      document.body.lastElementChild?.before(main);
    };

    const popstateEvent = new Event('popstate');
    window.dispatchEvent(popstateEvent);
  };
}
