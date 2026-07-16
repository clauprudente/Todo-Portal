import type { CreateTodoInput, Todo } from "@/types/todo";

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