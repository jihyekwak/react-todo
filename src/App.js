import "./App.css"
import { useState } from "react"

function Header() {
  return (
    <div className='header'>
      <h1>To Do List</h1>
    </div>
  )
}

function Create(props) {
  const [title, setTitle] = useState("")

  return (
    <div>
      <h4>What is your main focus today?</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          props.onCreate(title)
          setTitle("")
        }}>
        <input
          type='text'
          name='title'
          placeholder='to do list...'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}></input>
        <input type='submit'></input>
      </form>
    </div>
  )
}

function TodoList(props) {
  const [isDone, setIsDone] = useState(false);

  return (
    <div className='todo-list'>
      <span className={isDone ? 'done-todo': null}>{props.todo.title}</span>
      <button onClick={() => {
        props.onCheckHandler(props.todo.id, !isDone);
        setIsDone(!isDone);
        }}>Done</button>
      <button onClick={() => props.onEditHandler(props.todo.id)}>Edit</button>
      <button onClick={() => props.onDelete(props.todo.id)}>Delete</button>
    </div>
  )
}

function Edit(props) {
  const [editTitle, setEditTitle] = useState(props.todo.title)

  return (
    <div className='edit-todo'>
      <h4>Edit todo</h4>
      <form
        className='edit-form'
        onSubmit={(e) => {
          e.preventDefault()
          props.onEdit(editTitle)
        }}>
        <input
          type='text'
          name='title'
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}></input>
        <input type='submit'></input>
      </form>
    </div>
  )
}
function App() {
  const [todos, setTodos] = useState([{ id: 1, title: "Pick up kids" , done: false}]);
  const [nextId, setNextId] = useState(2);
  const [mode, setMode] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState();

  return (
    <div className='App'>
      <Header></Header>

      {mode !== "EDIT" ? (
        <>
          <Create
            onCreate={(_title) => {
              const newTodos = [...todos];
              const newTodo = { id: nextId, title: _title , done: false};
              newTodos.push(newTodo);
              setTodos(newTodos);
              setNextId(nextId + 1);
            }}></Create>

          <div>
            <h4>Things to do</h4>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <TodoList
                    todo={todo}
                    onDelete={(_id) => {
                      const newTodos = todos.filter((todo) => todo.id !== _id);
                      setTodos(newTodos);
                    }}
                    onEditHandler={(_id) => {
                      const selectedTodo = todos.find(
                        (todo) => todo.id === _id
                      )
                      setSelectedTodo(selectedTodo);
                      setMode("EDIT");
                    }}
                    onCheckHandler={(_id, isDone) => {
                      const newTodos = todos.map(todo => todo.id === _id ? Object.assign(todo, {done: isDone}): todo);
                      setTodos(newTodos);
                    }}
                    ></TodoList>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {mode === "EDIT" ? (
        <Edit
          todo={selectedTodo}
          onEdit={(_title) => {
            const newTodos = todos.map((todo) =>
              todo === selectedTodo
                ? Object.assign(todo, { title: _title })
                : todo
            )
            setTodos(newTodos)
            setMode(null)
          }}></Edit>
      ) : null}
    </div>
  )
}

export default App
