import type { Todo } from '@/types/todo';

const LOCAL_STORAGE_KEY = 'todo-list'

export const getTodos = (): Todo[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    console.log(data);

    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

export const saveTodos = (todos: Todo[]): boolean => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
        return true;
    } catch {
        return false;
    }
};


