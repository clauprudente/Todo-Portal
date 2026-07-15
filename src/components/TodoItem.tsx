import type { Todo } from "@/types/todo";

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
};

export function TodoItem({ todo, onToggle }: TodoItemProps) {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span>{todo.title}</span>
            <span>Remove</span>
        </li>
    );
}