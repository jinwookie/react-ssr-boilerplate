import Root from 'containers/Root';
import Child from 'containers/Child';
import GrandChild from 'containers/GrandChild';

const routes = [
  { component: Root,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/child/:id',
        component: Child,
        routes: [
          { path: '/child/:id/grand-child',
            component: GrandChild
          }
        ]
      }
    ]
  }
];

export default routes;
