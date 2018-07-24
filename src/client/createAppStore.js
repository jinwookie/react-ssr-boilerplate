import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import reducers from './reducers';

const createAppStore = () => {
  let initialState;
  if (typeof window === 'object') {
    initialState = fromJS(window.__INITIAL_STATE__);
    delete window.__INITIAL_STATE__;
  }
  
  const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};


export default createAppStore;
