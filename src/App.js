import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import List from './views/components/list';
import * as Services from './data/services/ProdutoService';
import NewItem from './views/components/newItem';

function App() {
  const [list, setList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const getList = async () => {
    const list = await Services.list();
    setList(list);
  }

  const add = (description) => {
    Services.create({
      description, 
      isChecked: false,
      // id: uuidv4().replace(/[^\d]+/g, '')
      id: uuidv4().int
    })
    .then(newItem => {
      setList([...list, newItem]);
    });
  }

  const remove = (id) => {
    // const indexItem = list.findIndex(item => item.id === id);
    // list.splice(indexItem, 1);
    // setlist([...list]);

    const newList = list.filter(item => item.id !== id);
    setList(newList);
    Services.remove(id);
  }

  const update = (newItem) => {
    const indexItem = list.find(item => item.id === newItem.id);
    list[indexItem] = newItem;
    setList(list);
    Services.update(newItem);

    setChecked();
  }

  const clear = () => {
    const done = [];
    const newList = [];

    list.forEach(item => {
      item.isChecked ? done.push(item) : newList.push(item);
    });

    done.forEach(item => remove(item.id));
    setList(newList);
  }

  const checkAllChange = (e) => {
    list.forEach(item => e ? item.isChecked = true : item.isChecked = false);
    setList([...list]);
  }

  const isCheckedAll = (arr) => {
    return arr.every(item => item.isChecked === true);
  }

  const setChecked = () => {
    const check = isCheckedAll(list);
    setIsChecked(check);
  }

  useEffect(() => {
    getList();
  },[]);

  useEffect(() => {
    setChecked();
  });

  return (
    <div className="App">
      <NewItem onAdd={add} />
      <hr />
      <button type="button" className="tw-btn" onClick={clear}>Remover selecionados</button>
      <hr />
      <label className="allCheck">
        <input type='checkbox' className='tw-check' checked={isChecked} onChange={(e) => checkAllChange(e.target.checked)} />
        <span>Selecionar todos</span>
      </label>
      <List list={list} onRemove={remove} onUpdate={update} />
    </div>
  );
}

export default App;
