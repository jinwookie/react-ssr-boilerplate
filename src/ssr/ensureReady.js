import { matchRoutes } from 'react-router-config';

const loadComponent = async match => {
  const { component } = match.route;
    if (component && component.load) {
      const loadedComponent = await component.load();
      return {
        component: loadedComponent,
        match
      }
    }
    return undefined;
};

const ensureReady = (routeConfig, pathname) => {
  const matches = matchRoutes(routeConfig, pathname);
  return Promise.all(matches.map(loadComponent));
};

export default ensureReady;
