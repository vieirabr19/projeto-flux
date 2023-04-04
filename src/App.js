import { useEffect, useState } from 'react';

import './App.css';
import List from './views/components/list';
import * as Services from './data/services/ProdutoService';

function App() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    list();
  },[]);

  const list = async () => {
    const list = await Services.list();
    setItens(list);
  }

  return (
    <div className="App">
      <List itens={itens} />
    </div>
  );
}

export default App;
