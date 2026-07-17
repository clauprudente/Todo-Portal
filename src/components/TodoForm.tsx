import { useState } from 'react';
import { validateTitle } from '@/utils/todo';

type TodoFormProps = {
  onAdd: (title: string, description: string) => void;
};

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }

    onAdd(title, description);

    setTitle('');
    setDescription('');
    setError(null);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__fields">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Add a task title"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'title-error-form' : undefined}
          />
          {error && (
            <span id="title-error-form" role="alert">
              {error}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a task description"
          />
        </div>
      </div>
      <button type="submit" className="btn btn--primary">
        Add
      </button>
    </form>
  );
};
