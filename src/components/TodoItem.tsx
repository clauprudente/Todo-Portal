import type { Todo } from "@/types/todo";

type TodoItemProps = {
    todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                readOnly
            />
            <span>{todo.title}</span>
        </li>
    );
}