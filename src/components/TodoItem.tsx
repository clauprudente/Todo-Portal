
import type { Todo } from "@/types/todo";

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span>{todo.title}</span>
            <button type="button" onClick={() => onDelete(todo.id)}>Remove</button>
        </li>
    );
}