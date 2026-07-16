import type { CreateTodoInput, Todo, TodoStatus } from "@/types/todo";

export const createTodo = (input: CreateTodoInput, now: number = Date.now()): Todo => {
    const description = input.description?.trim();

    return {
        id: crypto.randomUUID(),
        title: input.title.trim(),
        ...(description ? { description } : {}),
        created_at: now,
        completed: false,
    };
};

export const validateTitle = (title: string): string | null => {
    const todoTrimmed = title.trim();
    if (!todoTrimmed) return 'The title is mandatory.';
    return null;
};

export const normalize = (text: string): string =>
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export const filterTodosByName = (todos: Todo[], search: string): Todo[] => {
    const term = normalize(search);
    if (!term) return todos;

    return todos.filter(
        (todo) =>
            normalize(todo.title).includes(term) ||
            normalize(todo.description ?? '').includes(term),
    );
};

export const filterTodosByStatus = (todos: Todo[], status: TodoStatus): Todo[] => {
    if (status === 'all') return todos;
    if (status === 'completed') return todos.filter((t) => t.completed);
    return todos.filter((t) => !t.completed);
};