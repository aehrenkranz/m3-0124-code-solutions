/* eslint-disable @typescript-eslint/no-unused-vars -- Remove me */
import { useEffect, useState } from 'react';

export type UnsavedTodo = {
  task: string;
  isCompleted: boolean;
};
export type Todo = UnsavedTodo & {
  todoId: number;
};

export type UseTodosValues = {
  isLoading: boolean;
  error?: unknown;
  todos?: Todo[];
  addTodo: (todo: UnsavedTodo) => Promise<void>;
  toggleCompleted: (todoId: number) => Promise<void>;
};

export function useTodos(): UseTodosValues {
  const [todos, setTodos] = useState<Todo[]>();
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    async function effect() {
      try {
        if (todos === undefined) {
          const entries = await readTodos();
          setTodos(entries);
        }
      } catch (err) {
        setError(err);
      }
    }
    effect();
  }, [todos]);

  async function addTodo(newTodo: UnsavedTodo): Promise<void> {
    try {
      const res = await createTodo(newTodo);
      const newArr = todos.concat(res);
      setTodos(newArr);
    } catch (err) {
      setError(err);
    }
  }

  async function toggleCompleted(todoId: number): Promise<void> {
    try {
      let currentEntry;
      todos.forEach((e) => {
        if (e.todoId === todoId) {
          e.isCompleted = !e.isCompleted;
          currentEntry = e;
        }
      });
      const res = await updateTodo(currentEntry);
      const newArr = todos.map((e) => {
        if (e.todoId === res.todoId) {
          return res;
        } else {
          return e;
        }
      });
      setTodos(newArr);
    } catch (err) {
      setError(err);
    }
  }

  return {
    isLoading: todos === undefined && error === undefined,
    error,
    todos,
    addTodo,
    toggleCompleted,
  };
}

/**
 * Reads all To Do items from the API.
 * @returns Promise that resolves with the read items.
 */
async function readTodos(): Promise<Todo[]> {
  const res = await fetch('/api/todos');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Creates a new To Do item using the API.
 * @param todo The To Do to create.
 * @returns Promise that resolves with the new item returned from the API.
 */
async function createTodo(todo: UnsavedTodo): Promise<Todo> {
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  };
  const res = await fetch('/api/todos', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Updates a To Do item using the API by setting its `isCompleted` state.
 * @param todo The To Do to update.
 * @returns Promise that resolves with the updated To Do item.
 */
async function updateTodo(todo: Todo): Promise<Todo> {
  const req = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isCompleted: todo.isCompleted }),
  };
  const res = await fetch(`/api/todos/${todo.todoId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
