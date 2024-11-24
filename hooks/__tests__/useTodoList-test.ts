import { renderHook, act, waitFor } from '@testing-library/react';
import useTodos, { Todo } from '@/hooks/useTodoList';
import storage, { StorageKeys } from '@/store/storage';

jest.mock('@/store/storage');

describe('useTodos Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with an empty todo list when persistence is disabled', () => {
    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: false }));
    expect(result.current.todos).toEqual([]);
  });

  it('should save todos to storage when a new todo', async () => {
    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: true }));
    act(() => result.current.addItem('Persistent Todo'));
    expect(storage.setItem).toHaveBeenCalledWith(StorageKeys.TODOS, result.current.todos);
  });

  it('should correctly update the title of an existing todo', () => {
    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: false }));
    act(() => {
      result.current.addItem('Todo to Update');
    });

    const todoIdToUpdate = result.current.todos[0].id;
    act(() => {
      result.current.updateItem(todoIdToUpdate, 'Updated Todo');
    });

    expect(result.current.todos[0].title).toBe('Updated Todo');
  });

  it('should retrieve todos from storage when persistence is enabled', async () => {
    const mockTodoList: Todo[] = [{ id: '1', title: 'Test Todo', checked: false }];

    (storage.getItem as jest.Mock).mockResolvedValue(mockTodoList);

    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: true }));
    waitFor(() => {
      expect(result.current.todos).toEqual(mockTodoList);
    });
    expect(storage.getItem).toHaveBeenCalledWith(StorageKeys.TODOS);
  });

  it('should add a new todo to the list', () => {
    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: false }));

    act(() => result.current.addItem('New Todo'));
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe('New Todo');
  });

  it('should mark a todo as completed when toggled', () => {
    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: false }));

    act(() => {
      result.current.addItem('Todo to Toggle');
    });

    const todoIdToToggle = result.current.todos[0].id;

    act(() => {
      result.current.checkedItem(todoIdToToggle);
    });

    expect(result.current.todos[0].checked).toBe(true);
  });

  it('should persist todos to storage whenever they change when persistence is enabled', async () => {
    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: true }));
    act(() => result.current.addItem('Persistent Todo'));

    expect(storage.setItem).toHaveBeenCalledWith(StorageKeys.TODOS, result.current.todos);
  });

  it('should not save todos to storage when persistence is disabled', () => {
    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: false }));

    act(() => result.current.addItem('Non-Persistent Todo'));

    expect(storage.setItem).not.toHaveBeenCalled();
  });
  it('should initialize with an empty todo list', () => {
    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: false }));

    expect(result.current.todos).toEqual([]);
  });
  it('should allow duplicate todos with the same title', () => {
    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: false }));

    act(() => result.current.addItem('Duplicate Todo'));
    act(() => result.current.addItem('Duplicate Todo'));

    expect(result.current.todos).toHaveLength(2); // Assuming duplicates are prevented
  });
  it('should reload persisted todos after app restart', async () => {
    const mockTodos: Todo[] = [{ id: '1', title: 'Test Todo', checked: false }];

    (storage.getItem as jest.Mock).mockResolvedValue(mockTodos);

    const { result } = renderHook(() => useTodos({ isPersistenceEnabled: true }));

    await waitFor(() => {
      expect(result.current.todos).toEqual(mockTodos);
    });

    // Simulate "restarting" the app by re-running the hook
    const { result: restartedResult } = renderHook(() => useTodos({ isPersistenceEnabled: true }));

    await waitFor(() => {
      expect(restartedResult.current.todos).toEqual(mockTodos);
    });
  });
});
