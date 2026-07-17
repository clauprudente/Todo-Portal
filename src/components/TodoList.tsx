import { TodoItem } from './TodoItem';
import type { Todo, UpdateTodoInput } from '@/types/todo';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: UpdateTodoInput) => void;
};

export const TodoList = ({ todos, onToggle, onDelete, onUpdate }: TodoListProps) => {
  return todos.length === 0 ? (
    <p className="empty-state">No tasks found.</p>
  ) : (
    <ul className="todo-list">
      {' '}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};
