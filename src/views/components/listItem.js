import { useEffect, useRef, useState } from 'react';

const ListItem = ({item, onRemove, onUpdate}) => {
  const inputRef = useRef();
  const [isChecked, setIsChecked] = useState(item.isChecked || false);

  const check = () => {
    setIsChecked(!isChecked);
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

  useEffect(() => {
    setIsChecked(item.isChecked); 
    onUpdate(item);
  }, [item, onUpdate]);

  return (
    <li className='todo-list-item'>
      <input type='checkbox' className='tw-check' checked={isChecked} onChange={check} />
      <input type='text' className='tw-input' ref={inputRef} disabled={isChecked} defaultValue={item.description} onBlur={update} />
      <button className='tw-btn' onClick={remove}>X</button>
    </li>
  );
}

export default ListItem;