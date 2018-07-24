import { hot } from 'react-hot-loader';
import Header from 'components/App/Header';
import Content from 'components/App/Content';
import './App.scss';

const App = () => (
  <div className="container">
    <Header />
    <Content />
  </div>
);

export default hot(module)(App);
