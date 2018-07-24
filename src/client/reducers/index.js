import { combineReducers } from 'redux-immutable';
import ToDoReducer from './ToDoReducer';

const reducers = combineReducers({
  todos: ToDoReducer
});

export default reducers;
