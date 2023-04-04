const ListItem = ({item}) => {

  const check = () => {
    
  };

  return (
    <li className='todo-list-item'>
      <input type='checkbox' className='tw-check' checked={item.isChecked} onChange={check} />
      <input type='text' className='tw-input' disabled={item.isChecked} defaultValue={item.description} />
      <button className='tw-btn'>X</button>
    </li>
  );
}

export default ListItem;