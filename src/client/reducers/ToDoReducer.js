import { fromJS } from 'immutable';
import C from '../actions/ToDoActions';

export const toDoSelector = state => state.toJS().todos;

const initialState = {
  isLoaded: false,
  todos: []
};

const reducer = (state = fromJS(initialState), action) => {
  switch (action.type) {
    case C.INIT:
      return state.merge({
        todos: action.payload
      });
    case C.ADD:
      return state.merge({
        todos: state.get('todos').push({ todo: action.payload, completed: false })
      });
    case C.REMOVE:
      return state.merge({
        todos: state.get('todos').remove(action.payload)
      });
    case C.UPDATE:
      return state.merge({
        todos: state.get('todos').update(action.payload.index, () => ({ todo: action.payload.todo, completed: action.payload.completed }))
      });
    case C.CLEAR:
      return fromJS(initialState);
    case C.LOADED:
      return state.set('isLoaded', true);
    default:
      return state;
  }
};

export default reducer;
