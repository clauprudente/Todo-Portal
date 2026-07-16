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

  const handleSave = (): void => {
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
    setTitle(todo.title);
    setDescription(todo.description ?? '');
    setError(null);
    setIsEditing(false);
  };

  return isEditing ? (
    <li>
      <input
        aria-label="Edit title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);

          if (error) {
            setError(null);
          }
        }}
        aria-invalid={error ? true : undefined}
      />
      {error && (
        <span id="title-error-item" role="alert">
          {error}
        </span>
      )}
      <input
        aria-label="Edit description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </li>
  ) : (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <span>{todo.title}</span>
      {todo.description && <span>{todo.description}</span>}
      <small>{new Date(todo.created_at).toLocaleDateString()}</small>
      <button type="button" aria-label={`Edit ${todo.title}`} onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button type="button" aria-label={`Remove ${todo.title}`} onClick={() => onDelete(todo.id)}>
        Remove
      </button>
    </li>
  );
};
