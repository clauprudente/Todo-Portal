import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import App from './App';
import type { Todo } from '@/types/todo';

const LOCAL_STORAGE_KEY = 'todo-list';

async function addTodo(user: UserEvent, title: string, description = ''): Promise<void> {
  await user.type(screen.getByLabelText('Title'), title);
  if (description) {
    await user.type(screen.getByLabelText('Description'), description);
  }
  await user.click(screen.getByRole('button', { name: 'Add' }));
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows empty state when there are no tasks', () => {
    render(<App />);

    expect(screen.getByText('No tasks found.')).toBeInTheDocument();
  });

  it('adds a task with title and description', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast', 'Eggs and bread');

    expect(screen.getByText('Buy breakfast')).toBeInTheDocument();
    expect(screen.getByText('Eggs and bread')).toBeInTheDocument();
    expect(screen.queryByText('No tasks found.')).not.toBeInTheDocument();
  });

  it('clears the form after adding a task', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast', 'Eggs');

    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');
  });

  it('shows validation error when submitting an empty title', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByRole('alert')).toHaveTextContent('The title is mandatory.');
    expect(screen.getByLabelText('Title')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows validation error when submitting a whitespace-only title', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Title'), '   ');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByRole('alert')).toHaveTextContent('The title is mandatory.');
  });

  it('clears validation error when the user starts typing', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Title'), 'B');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Title')).not.toHaveAttribute('aria-invalid');
  });

  it('removes a task', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');
    await user.click(screen.getByRole('button', { name: /remove buy breakfast/i }));

    expect(screen.queryByText('Buy breakfast')).not.toBeInTheDocument();
    expect(screen.getByText('No tasks found.')).toBeInTheDocument();
  });

  it('toggles task completion', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');

    const checkbox = screen.getByRole('checkbox', { name: /mark buy breakfast as complete/i });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAccessibleName(/mark buy breakfast as incomplete/i);

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('filters tasks by search query in title', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');
    await addTodo(user, 'Walk the dog');

    await user.type(screen.getByLabelText('Search todos'), 'dog');

    expect(screen.queryByText('Buy breakfast')).not.toBeInTheDocument();
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
  });

  it('filters tasks by search query in description', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast', 'Fresh eggs');
    await addTodo(user, 'Walk the dog', 'Morning routine');

    await user.type(screen.getByLabelText('Search todos'), 'eggs');

    expect(screen.getByText('Buy breakfast')).toBeInTheDocument();
    expect(screen.queryByText('Walk the dog')).not.toBeInTheDocument();
  });

  it('filters tasks ignoring accents in the search', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Açúcar');
    await addTodo(user, 'Café');

    await user.type(screen.getByLabelText('Search todos'), 'acucar');

    expect(screen.getByText('Açúcar')).toBeInTheDocument();
    expect(screen.queryByText('Café')).not.toBeInTheDocument();
  });

  it('shows empty state when search has no matches', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');
    await user.type(screen.getByLabelText('Search todos'), 'nonexistent');

    expect(screen.getByText('No tasks found.')).toBeInTheDocument();
    expect(screen.queryByText('Buy breakfast')).not.toBeInTheDocument();
  });

  it('filters tasks by completed status', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');
    await addTodo(user, 'Walk the dog');

    await user.click(screen.getByRole('checkbox', { name: /mark buy breakfast as complete/i }));
    await user.selectOptions(screen.getByLabelText('Filter by status'), 'completed');

    expect(screen.getByText('Buy breakfast')).toBeInTheDocument();
    expect(screen.queryByText('Walk the dog')).not.toBeInTheDocument();
  });

  it('filters tasks by incomplete status', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');
    await addTodo(user, 'Walk the dog');

    await user.click(screen.getByRole('checkbox', { name: /mark buy breakfast as complete/i }));
    await user.selectOptions(screen.getByLabelText('Filter by status'), 'incomplete');

    expect(screen.queryByText('Buy breakfast')).not.toBeInTheDocument();
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
  });

  it('combines search and status filters', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');
    await addTodo(user, 'Buy milk');
    await addTodo(user, 'Walk the dog');

    await user.click(screen.getByRole('checkbox', { name: /mark buy breakfast as complete/i }));
    await user.selectOptions(screen.getByLabelText('Filter by status'), 'completed');
    await user.type(screen.getByLabelText('Search todos'), 'buy');

    expect(screen.getByText('Buy breakfast')).toBeInTheDocument();
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
    expect(screen.queryByText('Walk the dog')).not.toBeInTheDocument();
  });

  it('persists tasks to localStorage after adding', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast', 'Eggs');

    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]') as Todo[];
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('Buy breakfast');
    expect(stored[0].description).toBe('Eggs');
    expect(stored[0].completed).toBe(false);
  });

  it('loads tasks from localStorage on mount', () => {
    const persisted: Todo[] = [
      {
        id: 'persisted-id',
        title: 'Saved task',
        description: 'From storage',
        created_at: 1_700_000_000_000,
        completed: true,
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persisted));

    render(<App />);

    expect(screen.getByText('Saved task')).toBeInTheDocument();
    expect(screen.getByText('From storage')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /mark saved task as incomplete/i })).toBeChecked();
  });

  it('cancels editing without saving changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');
    await user.click(screen.getByRole('button', { name: /^edit buy breakfast/i }));

    const editInput = screen.getByLabelText('Edit title');
    await user.clear(editInput);
    await user.type(editInput, 'Buy milk');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByText('Buy breakfast')).toBeInTheDocument();
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Edit title')).not.toBeInTheDocument();
  });

  it('shows validation error when saving an empty title while editing', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');
    await user.click(screen.getByRole('button', { name: /^edit buy breakfast/i }));

    const editForm = screen.getByLabelText('Edit title').closest('form');
    expect(editForm).not.toBeNull();

    const editInput = screen.getByLabelText('Edit title');
    await user.clear(editInput);
    await user.click(within(editForm!).getByRole('button', { name: 'Save' }));

    expect(screen.getByRole('alert')).toHaveTextContent('The title is mandatory.');
    expect(screen.getByLabelText('Edit title')).toHaveAttribute('aria-invalid', 'true');
  });

  it('reopens the edit form showing the saved value, not the previously typed one', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTodo(user, 'Buy breakfast');
    await user.click(screen.getByRole('button', { name: /^edit/i }));

    const editInput = screen.getByLabelText('Edit title');
    await user.clear(editInput);
    await user.type(editInput, '   Buy milk   ');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Buy milk')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^edit/i }));
    expect(screen.getByLabelText('Edit title')).toHaveValue('Buy milk');
  });
});
