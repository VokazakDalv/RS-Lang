import { routing, defaultRoute } from './router';

export class App {
  enableRouteChange = (): void => {
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      while (document.body.children.length) {
        document.body.children[0].remove();
      }

      if (currentRoute) {
        currentRoute.component();
      } else if (defaultRoute) {
        defaultRoute.component();
      }
    };

    const popstateEvent = new Event('popstate');
    window.dispatchEvent(popstateEvent);
  };
}
