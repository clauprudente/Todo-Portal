import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reopens the edit form showing the saved value, not the previously typed one', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Title'), 'Buy breakfast');
    await user.click(screen.getByRole('button', { name: 'Add' }));

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
