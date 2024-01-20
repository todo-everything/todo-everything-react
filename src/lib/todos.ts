import { useMutation, useQuery } from '@tanstack/react-query'
import TodosApi from '~/api/todos.ts'
import { queryClient } from '~/lib/react-query'
import { ITodo } from '~/api/models'

const DEFAULT_STALE_TIME_MS = 1000 * 60 * 5

export const useTodos = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: TodosApi.fetchAll,
    staleTime: DEFAULT_STALE_TIME_MS,
  })

export const useSingleTodo = (todoId: number) =>
  useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => TodosApi.fetchOne(todoId),
    staleTime: DEFAULT_STALE_TIME_MS,
  })

export const useUpdateTodo = (todoId: number) =>
  // TODO: Invalidate Todo with this id
  useMutation({
    mutationFn: (updates) => TodosApi.update(todoId, updates),
    onSuccess: (data) => {
      // Update the newly updated thing
      queryClient.setQueryData(['todos', todoId], data)
      queryClient.setQueryData(['todos'], (store: ITodo[]) => {
        const keyToUpdate = store.findIndex((todo) => todo.id === data.id)
        // Update in an immutable way or else it won't update properly.
        const newStore = [...store]
        if (keyToUpdate > 0) {
          newStore[keyToUpdate] = data
        }
        return newStore
      })
    },
  })

export function useDeleteTodo(todoId: number) {
  return useMutation({
    mutationFn: () => TodosApi.delete(todoId),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['todos', todoId], exact: true })
      queryClient.setQueryData(['todos'], (store: ITodo[]) =>
        store.filter((todo) => todo.id !== todoId),
      )
    },
  })
}
