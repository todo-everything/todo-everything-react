import { httpClientPrivate } from '~/lib/httpClientPrivate.ts'
import { IPartialTodo, ITodo } from './models'
import { IHttpApi } from '~/api/types'

export type TodoDTO = IPartialTodo

const TodosApi: IHttpApi<ITodo> = {
  fetchAll: async (): Promise<ITodo[]> => {
    const res = await httpClientPrivate.get('/todo/')
    return res?.data
  },

  fetchOne: async (id: number): Promise<ITodo> => {
    const res = await httpClientPrivate.get(`/todo/${id}/`)
    return res?.data
  },

  create: async (data: TodoDTO): Promise<ITodo> => {
    const res = await httpClientPrivate.post('/todo/', data)
    return res?.data
  },

  update: async (id: number, updates: TodoDTO): Promise<ITodo> => {
    const res = await httpClientPrivate.put(`/todo/${id}/`, updates)
    return res?.data
  },

  delete: async (id: number) => {
    const res = await httpClientPrivate.delete(`/todo/${id}/`)
    return res?.data
  },
}

export default TodosApi
