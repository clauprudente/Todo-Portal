import { TodoItem } from "./TodoItem"
import type { Todo } from "@/types/todo";

type TodoItemProps = {
    todos: Todo[];
};

export function TodoList({ todos }: TodoItemProps) {
    return (<ul>
        {todos.map((todo) =>
            <TodoItem
                key={todo.id}
                todo={todo} />
        )}
    </ul>);
};