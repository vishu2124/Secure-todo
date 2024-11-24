import { useCallback, useEffect, useReducer } from 'react';
import storage, { StorageKeys } from '@/store/storage';

enum TodoActionEnum {
  ADD_ITEM = 'ADD_ITEM',
  CHECKED_ITEM = 'CHECKED_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  SET_TODOS = 'SET_TODOS',
}

type TodoAction =
  | { type: TodoActionEnum.ADD_ITEM; payload: { title: string } }
  | { type: TodoActionEnum.CHECKED_ITEM; payload: { id: string } }
  | { type: TodoActionEnum.UPDATE_ITEM; payload: { id: string; title: string } }
  | { type: TodoActionEnum.SET_TODOS; payload: TodoState };

export type Todo = { id: string; title: string; checked: boolean };

export type TodoState = Todo[];

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionEnum.ADD_ITEM:
      return [...state, { id: `${Math.random()}`, title: action.payload.title, checked: false }];

    case TodoActionEnum.CHECKED_ITEM: // Soft delete
      return state.map((todo) => (todo.id === action.payload.id ? { ...todo, checked: true } : todo));

    case TodoActionEnum.UPDATE_ITEM:
      return state.map((todo) => (todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo));

    case TodoActionEnum.SET_TODOS:
      return action.payload;

    default:
      return state;
  }
};

type UseTodoListConfig = {
  isPersistenceEnabled?: boolean;
};

const useTodoList = ({ isPersistenceEnabled = true }: UseTodoListConfig = {}) => {
  const [todos, dispatch] = useReducer<typeof todoReducer>(todoReducer, []);

  const addItem = useCallback((title: string) => {
    dispatch({ type: TodoActionEnum.ADD_ITEM, payload: { title } });
  }, []);

  const checkedItem = useCallback((id: string) => {
    dispatch({ type: TodoActionEnum.CHECKED_ITEM, payload: { id } });
  }, []);

  const updateItem = useCallback((id: string, title: string) => {
    dispatch({ type: TodoActionEnum.UPDATE_ITEM, payload: { id, title } });
  }, []);

  // Load todos from storage if persistence is enabled
  useEffect(() => {
    if (isPersistenceEnabled) {
      const loadTodos = async () => {
        const storedTodos = await storage.getItem<Todo[]>(StorageKeys.TODOS);
        if (storedTodos) {
          dispatch({ type: TodoActionEnum.SET_TODOS, payload: storedTodos });
        }
      };
      loadTodos();
    }
  }, [isPersistenceEnabled]);

  // Save todos to storage whenever they change
  useEffect(() => {
    if (isPersistenceEnabled) {
      storage.setItem(StorageKeys.TODOS, todos);
    }
  }, [todos, isPersistenceEnabled]);

  return {
    todos,
    addItem,
    checkedItem,
    updateItem,
  };
};

export default useTodoList;
