import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteTodo, useSingleTodo, useUpdateTodo } from '~/lib/todos.ts'
import { useForm } from 'react-hook-form'
import { type TodoDTO } from '~/api/todos.ts'
import _ from 'lodash'
import { TbTrash } from 'react-icons/tb'
import { useState } from 'react'
import Modal from '~/components/Modal.tsx'

interface TodoEditViewProps {}

export default function TodoEditView(props: TodoEditViewProps) {
  const navigate = useNavigate()
  const params = useParams()
  const todoQuery = useSingleTodo(params.todoId)
  const todo = _.pick(todoQuery.data, ['title', 'body'])
  const updateTodo = useUpdateTodo(params.todoId)
  const deleteTodoMutation = useDeleteTodo(Number.parseInt(params.todoId, 10))
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<TodoDTO>({ values: todo })

  const handleBodyChange = (updates) => {
    setValue('body', updates)
  }

  const handleSubmit = async (data) => {
    console.log('handleUpdateClick', {})
    await updateTodo.mutate(data)
    navigate(`/todos/${params.todoId}`)
  }

  if (todoQuery.isLoading) {
    return <div className="w-full h-full">Todo loading...</div>
  }

  if (!todoQuery.data) {
    return <div>No data?</div>
  }

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(`/todos/${params.todoId}`)
  }

  const handleConfirmDelete = (e) => {
    e.preventDefault()
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    await deleteTodoMutation.mutate()
    navigate(`/todos/`)
  }

  return (
    <div className="mx-auto w-full">
      {showDeleteModal && (
        <Modal
          showModal={showDeleteModal}
          title="Delete this todo?"
          body="Are you sure you want to delete this?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      <form onSubmit={rhfHandleSubmit(handleSubmit)}>
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Todo title"
            {...register('title', { required: true })}
          />
          {errors.title && <div>Email error: {errors.title.message}</div>}
        </div>

        <div className="form-control mt-4">
          <div className="label">
            <span className="label-text">Body</span>
          </div>
          <textarea
            className="textarea input-bordered rounded-btn"
            {...register('body', { required: true })}
          />
        </div>

        <div className="w-full mt-5 flex flex-row">
          <button
            className="btn btn-error"
            type="button"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
          <div className="join justify-end ml-auto">
            <button
              className="join-item btn"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="join-item btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
