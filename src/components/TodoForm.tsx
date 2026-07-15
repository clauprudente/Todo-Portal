import { useState } from "react";

type TodoFormProps = {
    onAdd: (title: string, description: string) => void;
};

export function TodoForm({ onAdd }: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onAdd(title, description);

        setTitle("");
        setDescription("");
    };


    return (<form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a task title"
            />
        </div>
        <div>
            <label htmlFor="description">Description</label>
            <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a task description"
            />
        </div>
        <button type="submit">
            Add
        </button>
    </form>);
};