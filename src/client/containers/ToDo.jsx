import { connect } from 'react-redux';
import ToDoList from 'components/Todos/ToDoList';
import { loadData, update } from 'actions/ToDoActions';
import { toDoSelector } from 'reducers/ToDoReducer';

class ToDoContainer extends React.Component {
  static loadData(params, query, ssr) {
    return loadData(params, query, ssr);
  }

  componentDidMount() {
    const {
      isLoaded,
      onLoad,
    } = this.props;

    if (!isLoaded) {
      onLoad();
    }
  }

  render() {
    const { todos, onUpdate } = this.props;

    return (
      <ToDoList todos={todos} onUpdate={onUpdate} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadData()),
  onUpdate: (todo, completed, index) => dispatch(update(todo, completed, index)),
});

export default connect(toDoSelector, mapDispatchToProps)(ToDoContainer);
