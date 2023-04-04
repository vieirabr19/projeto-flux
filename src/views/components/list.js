import ListItem from './listItem';

export default function List({itens}){
  return (
    <ul>
      {itens && itens.length === 0 && <div>No itens</div>}
      {itens && itens.length > 0 && itens.map(item => <ListItem key={item.id} item={item} />)}
    </ul>
  );
}

