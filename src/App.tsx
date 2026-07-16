import { useState, useMemo } from 'react';
import { SearchInput } from './components/SearchInput';
import { StatusFilter } from './components/StatusFilter';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import { filterTodosByName, filterTodosByStatus } from './utils/todo';
import type { TodoStatus } from '@/types/todo';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TodoStatus>('all');

  const filteredTodos = useMemo(() => {
    const byName = filterTodosByName(todos, search);
    return filterTodosByStatus(byName, status);
  }, [todos, search, status]);

  return (
    <>
      <TodoForm onAdd={addTodo} />
      <SearchInput searchValue={search} onSearchChange={setSearch} />
      <StatusFilter value={status} onChange={setStatus} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />
    </>
  );
}

export default App;
