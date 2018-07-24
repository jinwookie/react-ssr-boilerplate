const C = {
  ADD: 'todos/ADD',
  REMOVE: 'todos/REMOVE',
  UPDATE: 'todos/UPDATE',
  CLEAR: 'todos/CLEAR',
  LOADED: 'todos/LOADED',
};

export const add = todo => ({ type: C.ADD, payload: todo });
export const remove = index => ({ type: C.REMOVE, payload: index });
export const update = (todo, completed, index) => ({ type: C.UPDATE, payload: { todo, completed, index } });
export const clear = () => ({ type: C.CLEAR });

export const loadData = (params, ssr) => dispatch => {
  dispatch(add('TEST TODO'));
  if (ssr) {
    dispatch({ type: C.LOADED });
  }
};

export default C;
