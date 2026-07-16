import type { Todo } from '@/types/todo';

const LOCAL_STORAGE_KEY = 'todo-list';

export const getTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!data) return [];

    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]): boolean => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch {
    return false;
  }
};
