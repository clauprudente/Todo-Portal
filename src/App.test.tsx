import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import App from './App';

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
});
