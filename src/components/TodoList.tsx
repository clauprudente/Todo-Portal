
import { TodoItem } from "./TodoItem"
import type { Todo, UpdateTodoInput } from "@/types/todo";

type TodoListProps = {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, patch: UpdateTodoInput) => void;
};

export function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
    return (<ul>
        {todos.map((todo) =>
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate} />


        )}
    </ul>);
};