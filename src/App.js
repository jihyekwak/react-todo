import './App.css';
import { useState } from 'react';

function Header() {
  return (<div className='header'>
    <h1>To Do List</h1>
  </div>)
}

function Create(props) {
  return(<div>
    <form onSubmit={(e) => {
      e.preventDefault();
      const title = e.target.title.value
      props.onCreate(title)
    }}>
      <input type="text" name='title' placeholder='Add to do list...'></input>
      <input type="submit"></input>
    </form>
  </div>)
}

function App() {
  const [todos, setTodos] = useState([{id:1, title: 'Pick up kids'}]);
  const [nextId, setNextId] = useState(2);

  return (
    <div className="App">
      <Header></Header>
      <Create onCreate={(_title) => {
        const newTodos = [...todos];
        const newTodo = {id: nextId, title: _title};
        newTodos.push(newTodo);
        setTodos(newTodos);
        setNextId(nextId+1)
      } }></Create>
    </div>
  );
}

export default App;
