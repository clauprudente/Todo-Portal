import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('add a todo item', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Buy breakfast', '');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe('Buy breakfast');
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('toggles completion back and forth', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Task', '');
    });
    const id = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(id);
    });
    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo(id);
    });
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('remove todo item', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Todo', '');
    });
    const id = result.current.todos[0].id;

    act(() => {
      result.current.deleteTodo(id);
    });
    expect(result.current.todos).toHaveLength(0);
  });
});
