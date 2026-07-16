import { describe, it, expect } from 'vitest';
import { createTodo, validateTitle } from './todo';

describe('create todo', () => {
    it('title trimmed', () => {
        expect(createTodo({ title: '  Buy soap  ' }).title).toBe('Buy soap');
    });

    it('check if has description empty', () => {
        const todo = createTodo({ title: 'x', description: '   ' });
        expect(todo).not.toHaveProperty('description');
    });
});

describe('validateTitle', () => {
    it('reject empty title', () => {
        expect(validateTitle('')).not.toBeNull();
    });
});