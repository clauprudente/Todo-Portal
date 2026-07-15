
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from "./hooks/useTodos"

function App() {
  const { todos, addTodo } = useTodos();


  return (<>
    <TodoForm onAdd={addTodo} />
    <TodoList todos={todos} />
  </>
  )
}

export default App
