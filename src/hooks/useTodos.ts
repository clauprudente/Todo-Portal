import { useState, useEffect } from "react";
import type { Todo } from "@/types/todo";
import { getTodos, saveTodos } from "@/services/todo.storage";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(() => getTodos());

    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    const addTodo = (title: string, description: string): void => {
        const updatedTodos: Todo[] = [
            ...todos,
            {
                id: crypto.randomUUID(),
                title,
                description,
                created_at: Date.now(),
                completed: false
            }]

        setTodos(updatedTodos);
        saveTodos(todos);
    }

    return {
        todos,
        addTodo
    };
}