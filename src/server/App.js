require('@babel/polyfill');
const express = require('express');
const compression = require('compression');
const { renderToString } = require('react-dom/server');
const { Provider } = require('react-redux');
const { StaticRouter: Router } = require('react-router-dom');
const { matchRoutes } = require('react-router-config');
const createAppStore = require('../client/createAppStore').default;
const App = require('../client/App').default;
const routes = require('../client/routes/Routes').default;
const ensureReady = require('../ssr/ensureReady').default;

const app = express();
app.use(compression());

app.use('/dist', express.static('dist'));

app.get('/favicon.ico', (req, res) => res.send());

const getHtml = ({ files, html, initialState, title }) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      ${ files['styles.css'] ? `<link rel="stylesheet" type="text/css" href="${files['styles.css']}" />` : '' }
      <title>${title}</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};
      </script>
      <script src="${files['vendors.js']}"></script>
      <script src="${files['main.js']}"></script>
      ${files['styles.js'] ? `<script src="${files['styles.js']}"></script>` : ''}
    </body>
  </html>
`;

app.get('*', async (req, res) => {
  const DEV = process.env.NODE_ENV !== 'production';
  const basePath = 'http://localhost:8080/dist';
  let files = {
    ['vendors.js']: `${basePath}/vendors.js`,
    ['main.js']: `${basePath}/main.js`,
    ['styles.css']: !DEV && `${basePath}/styles.css`,
    ['styles.js']: !DEV && `${basePath}/styles.js`,
  };

  if (!DEV) {
    files = await import('../../dist/manifest.json').then(mod => mod.default);
  }

  const context = { };
  const store = createAppStore();

  const matches = await ensureReady(routes, req.path);
  if (matches && matches.length > 0) {
    await Promise.all(matches.map(match => {
      if (match.component.loadData) {
        return store.dispatch(match.component.loadData(match.match.match.params, true));
      }
    }));
  }

  const initialState = store.getState();

  const html = renderToString(
    <Provider store={store}>
      <Router location={req.url} context={context}>
        <App />
      </Router>
    </Provider>
  );

  if (context.url) {
    res.redirect(context.url);
  }
  else {
    res.send(getHtml({ files, html, initialState, title: 'TEST' }));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
