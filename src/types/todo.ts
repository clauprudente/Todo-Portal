export type Todo = {
    id: string;
    title: string;
    description?: string;
    created_at: number;
    completed: boolean;
}

export type CreateTodoInput = Omit<Todo, 'id' | 'created_at' | 'completed'>;

export type UpdateTodoInput = Partial<Pick<Todo, 'title' | 'description' | 'completed'>>;

export type TodoStatus = 'all' | 'completed' | 'incomplete';
