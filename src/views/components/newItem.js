import { useState } from 'react';

function NewItem({onAdd}){
  const [item, setItem] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const {value, name} = target;

    setItem({[name]: value});
  };

  const submit = (e) => {
    e.preventDefault();
    const description = item.description;

    if(description){
      setItem({description: ''});
      onAdd(description);
    }else{
      alert('Cadastre um item.');
    }
  };

  return (
    <form onSubmit={submit}>
      <input 
        className='tw-input'
        type='text' 
        placeholder='Nove item'
        name='description'
        value={item.description ? item.description : ''}
        onChange={handleChange}
      />
      <button type="submit" className='tw-btn'>Adicionar</button>
    </form>
  );
}

export default NewItem;