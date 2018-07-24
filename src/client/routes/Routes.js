import createAsyncComponent from '../../ssr/createAsyncComponent';

const routes = [
  {
    path: '/',
    exact: true,
    component: createAsyncComponent({
      loader: () => import('containers/Root'),
    }),
  },
  {
    path: '/todos',
    exact: true,
    component: createAsyncComponent({
      loader: () => import('containers/ToDo'),
    }),
  }
];

export default routes;
