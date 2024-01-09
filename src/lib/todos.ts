import { useQuery } from '@tanstack/react-query'
import TodosApi from '~/api/todos.ts'


export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: TodosApi.fetchAll,
    staleTime: 5 * 1000,
  })
}