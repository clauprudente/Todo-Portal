
import { TodoItem } from "./TodoItem"
import type { Todo } from "@/types/todo";

type TodoListProps = {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    return (<ul>
        {todos.map((todo) =>
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete} />

        )}
    </ul>);
};