import { useRef } from 'react';

const ListItem = ({item, onRemove, onUpdate}) => {
  const inputRef = useRef();

  const check = () => {
    item.isChecked = !item.isChecked;
    onUpdate(item);
  };

  const remove = () => {
    onRemove(item.id);
  };

  const update = () => {
    item.description = inputRef.current.value;
    onUpdate(item);
  };

  return (
    <li className='todo-list-item'>
      <input type='checkbox' className='tw-check' checked={item.isChecked} onChange={check} />
      <input type='text' className='tw-input' ref={inputRef} disabled={item.isChecked} defaultValue={item.description} onBlur={update} />
      <button className='tw-btn' onClick={remove}>X</button>
    </li>
  );
}

export default ListItem;