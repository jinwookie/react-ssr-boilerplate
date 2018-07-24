import '@babel/polyfill';
import 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from 'routes/Routes';
import App from './App';
import createAppStore from './createAppStore';
import ensureReady from '../ssr/ensureReady';

const store = createAppStore();

ensureReady(routes, location.pathname).then(() => {
  hydrate(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root'))
});
