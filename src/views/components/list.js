import ListItem from './listItem';

export default function List({list, onRemove, onUpdate}){
  return (
    <ul>
      {list && list.length === 0 && <div>No itens</div>}
      {list && list.length > 0 && list.map(item => <ListItem key={item.id} item={item} onRemove={onRemove} onUpdate={onUpdate} />)}
    </ul>
  );
}

