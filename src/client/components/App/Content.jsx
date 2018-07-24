import { renderRoutes } from 'react-router-config';
import routes from 'routes/Routes';
import './Content.scss';

const Content = () => (
  <div className="content">
    <h1>Hello, World</h1>
    { renderRoutes(routes) }
  </div>
);

export default Content;
