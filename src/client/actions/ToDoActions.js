const C = {
  INIT: 'todos/INIT',
  ADD: 'todos/ADD',
  REMOVE: 'todos/REMOVE',
  UPDATE: 'todos/UPDATE',
  CLEAR: 'todos/CLEAR',
  LOADED: 'todos/LOADED',
};

export const init = () => dispatch => {
  return dispatch({
    type: C.INIT,
    payload: [
      { todo: 'TEST TODO 1', completed: false },
      { todo: 'TEST TODO 2', completed: true },
      { todo: 'TEST TODO 3', completed: false },
    ]
  });
};
export const add = todo => ({ type: C.ADD, payload: todo });
export const remove = index => ({ type: C.REMOVE, payload: index });
export const update = (todo, completed, index) => ({ type: C.UPDATE, payload: { todo, completed, index } });
export const clear = () => ({ type: C.CLEAR });

export const loadData = (params, query, ssr) => dispatch => {
  dispatch(init());
  if (ssr) {
    dispatch({ type: C.LOADED });
  }
};

export default C;
