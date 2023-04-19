import {
  EventEmitter
} from 'events';

import {
  v4 as uuidv4
} from 'uuid';
import * as Services from '../services/ProdutoService';

import AppDispatcher from '../dispatcher/appDispatcher';
import TodoConstants from '../constants/todoConstants';

const Channel = new EventEmitter(),
  CHANGE_EVENT = 'change';

let _todoList = [];

function createItem(description) {
  return Services.create({
      description,
      isChecked: false,
      id: uuidv4().int
    })
    .then(newItem => {
      _todoList.push(newItem);
    });
}

function updateItem(newItem) {
  const indexItem = _todoList.findIndex(item => item.id === newItem.id);
  _todoList[indexItem] = newItem;
  return Services.update(newItem);
}

function removeItem(id) {
  // const indexItem = list.findIndex(item => item.id === id);
  // list.splice(indexItem, 1);
  // setlist([...list]);

  _todoList.filter(item => item.id !== id);
  return Services.remove(id);
}

function clearAll() {
  const done = [];
  const newList = [];

  _todoList.forEach(item => {
    item.isChecked ? done.push(item) : newList.push(item);
  });

  done.forEach(item => removeItem(item.id));
  _todoList = newList;
}

const TodoStore = {
  async getAll() {
    if (_todoList.length === 0) {
      _todoList = await Services.list();
    }
    return _todoList;
  },
  emitChange() {
    console.log('EMIT');
    Channel.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    console.log('ON');
    Channel.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    console.log('OFF');
    Channel.removeListener(CHANGE_EVENT, callback);
  }
}

async function handleAction(action) {
  switch (action.actionType) {
    case TodoConstants.TODO_CREATE:
      const description = action.description;
      await createItem(description);
      TodoStore.emitChange();
      break;
    case TodoConstants.TODO_UPDATE:
      await updateItem(action.item);
      TodoStore.emitChange();
      break;
    case TodoConstants.TODO_REMOVE:
      await removeItem(action.id);
      TodoStore.emitChange();
      break;
    case TodoConstants.TODO_CLEAR:
      clearAll();
      TodoStore.emitChange();
      break;
    default:
      return 'Não há ação';
  }
}

TodoStore.dispatchToken = AppDispatcher.register(handleAction);
export default TodoStore;