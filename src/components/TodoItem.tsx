import { useState } from 'react';
import type { Todo, UpdateTodoInput } from '@/types/todo';
import { validateTitle } from '@/utils/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: UpdateTodoInput) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description ?? '');
  const [error, setError] = useState<string | null>(null);

  const errorId = `todo-${todo.id}-title-error`;

  const startEditing = (): void => {
    setTitle(todo.title);
    setDescription(todo.description ?? '');
    setError(null);
    setIsEditing(true);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }
    onUpdate(todo.id, {
      title: title.trim(),
      description: description.trim() || undefined,
    });
    setIsEditing(false);
    setError(null);
  };

  const handleCancel = (): void => {
    setError(null);
    setIsEditing(false);
  };

  return isEditing ? (
    <li className="todo-item todo-item--editing">
      <form
        className="todo-item__edit-form"
        onSubmit={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Escape') handleCancel();
        }}
      >
        <input
          placeholder="Add a task title"
          aria-label="Edit title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <span id={errorId} role="alert">
            {error}
          </span>
        )}
        <input
          placeholder="Add a task description"
          aria-label="Edit description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="todo-item__edit-actions">
          <button type="submit" className="btn btn--primary">
            Save
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </li>
  ) : (
    <li className={`todo-item${todo.completed ? ' todo-item--completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <div className="todo-item__content">
        <span className="todo-item__title">{todo.title}</span>
        {todo.description && <span className="todo-item__description">{todo.description}</span>}
      </div>
      <small className="todo-item__date">{new Date(todo.created_at).toLocaleDateString()}</small>
      <div className="todo-item__actions">
        <button
          type="button"
          className="btn btn--ghost"
          aria-label={`Edit ${todo.title}`}
          onClick={startEditing}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn--danger"
          aria-label={`Remove ${todo.title}`}
          onClick={() => onDelete(todo.id)}
        >
          Remove
        </button>
      </div>
    </li>
  );
};
