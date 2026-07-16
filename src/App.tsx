
import { useState, useMemo } from 'react';
import { SearchInput } from './components/SearchBar';
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from "./hooks/useTodos"
import { filterTodosByName } from './utils/todo';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();

  const [search, setSearch] = useState("");

  const visibleTodos = useMemo(
    () => filterTodosByName(todos, search),
    [todos, search],
  );

  return (<>
    <TodoForm onAdd={addTodo} />
    <SearchInput searchValue={search} onSearchChange={setSearch} />

    <TodoList
      todos={visibleTodos}
      onToggle={toggleTodo}
      onDelete={deleteTodo}
      onUpdate={updateTodo} />
  </>
  )
}

export default App
