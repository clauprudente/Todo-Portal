
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from "./hooks/useTodos"

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();


  return (<>
    <TodoForm onAdd={addTodo} />
    <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
  </>
  )
}

export default App
