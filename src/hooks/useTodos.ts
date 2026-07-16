import { useState, useEffect } from "react";
import type { Todo } from "@/types/todo";
import { getTodos, saveTodos } from "@/services/todo.storage";
import { createTodo } from "@/utils/todo";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(() => getTodos());

    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    const addTodo = (title: string, description: string): void => {
        const updatedTodo = createTodo({ title, description })

        setTodos((prev) => [
            ...prev,
            updatedTodo]);
    }

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        console.log(id);

        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo
    };
}