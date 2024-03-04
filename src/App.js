import './App.css';
import { useState } from 'react';

function Header() {
  return (<div className='header'>
    <h1>To Do List</h1>
  </div>)
}

function Create(props) {
  const [title, setTitle] = useState('');

  return(<div>
    <form onSubmit={(e) => {
      e.preventDefault();
      props.onCreate(title);
      setTitle('')
    }}>
      <input type="text" name='title' placeholder='Add to do list...' required value={title} onChange={(e)=> setTitle(e.target.value)}></input>
      <input type="submit"></input>
    </form>
  </div>)
}

function TodoList(props) {
  return(
    <div className='todo-list'>
      <p>{props.todo.title}</p>
    </div>
  )
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

      <ul>
        {todos.map(todo => <li key={todo.id}><TodoList  todo={todo}></TodoList></li>)}
      </ul>

    </div>
  );
}

export default App;
