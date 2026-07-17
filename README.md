# Todo List

A task management application developed using React and TypeScript, allowing users to create, edit, delete, search for, and filter tasks. Data is persisted locally using Local Storage.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Local Storage
- Vitest (testes)

## Features

1. Create a task
2. Edit an existing task
3. Remove a task
4. Mark a task as completed
5. Search for tasks by title or description
6. Filter tasks by their status

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run the tests

```bash
npm run test
```

## Design Decisions

- Custom Hook (**useTodos**) centralizes the application's state management.
- Local Storage is abstracted behind a service layer to simplify future migration to an API.
- Utility functions encapsulate validation, filtering, normalization, and todo creation.
- Strong typing is used throughout the application to improve maintainability and type safety.

## Architecture

The project is organized using a simple separation of responsibilities to improve maintainability, readability, and scalability.

```text
src/
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── services/     # Data persistence (Local Storage)
├── types/        # Shared TypeScript types
├── utils/        # Business logic and helper functions
├── App.tsx
└── main.tsx
```

### Responsibilities

- **components**: Contains reusable and presentational UI components.
- **hooks**: Encapsulates state management and application logic using custom React hooks.
- **services**: Provides an abstraction layer for data persistence, making it easy to replace Local Storage with an API in the future.
- **types**: Centralizes shared TypeScript types and interfaces.
- **utils**: Contains pure utility functions such as validation, filtering, normalization, and todo creation.

This structure keeps business logic separate from presentation, promotes code reuse, and makes the application easier to maintain and extend.

### Author

Developed by Cláudia Maria Prudente dos Santos
