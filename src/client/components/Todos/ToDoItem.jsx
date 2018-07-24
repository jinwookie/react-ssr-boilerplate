import './ToDoItem.scss';

const ToDoItem = ({
  todo,
  completed,
  onClick
}) => (
  <li className={`todo-item${completed ? ' strike' : ''}`}>
    <button onClick={onClick}>{todo}</button>
  </li>
);

export default ToDoItem;
