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
    <div className="app">
      <header className="app__header">
        <h1>Todo List</h1>
      </header>
      <main className="app__main">
        <TodoForm onAdd={addTodo} />
        <div className="toolbar">
          <div className="toolbar__search">
            <SearchInput searchValue={search} onSearchChange={setSearch} />
          </div>
          <div className="toolbar__filter">
            <StatusFilter value={status} onChange={setStatus} />
          </div>
        </div>
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </main>
    </div>
  );
}

export default App;
