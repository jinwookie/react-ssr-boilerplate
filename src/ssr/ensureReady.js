import { matchRoutes } from 'react-router-config';

const loadComponent = async found => {
  const { route, match } = found;
  const { component } = route;
  if (component && component.load) {
    const loadedComponent = await component.load();
    return {
      route,
      component: loadedComponent,
      match,
    }
  }
  return undefined;
};

const ensureReady = (routeConfig, pathname) => {
  const matches = matchRoutes(routeConfig, pathname);
  return Promise.all(matches.map(loadComponent));
};

export default ensureReady;
