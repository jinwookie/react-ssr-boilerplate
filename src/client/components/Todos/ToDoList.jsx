import ToDoItem from './ToDoItem';

const ToDoList = ({
  todos,
  onUpdate
}) =>
  todos && Array.isArray(todos) && todos.length > 0 ? (
    <ul>
      { todos.map((todo, index) => <ToDoItem key={index} {...todo} onClick={() => onUpdate(todo.todo, !todo.completed, index)} />) }
    </ul>
  ) : <div>NO TODOS</div>;

export default ToDoList;
