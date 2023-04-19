import AppDispatcher from '../dispatcher/appDispatcher';
import TodoConstants from '../constants/todoConstants';

const TodoActions = {
  create(description) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      description
    })
  },
  update(item) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE,
      item
    })
  },
  remove(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE,
      id
    })
  },
  clear() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CLEAR
    })
  }
}

export default TodoActions;