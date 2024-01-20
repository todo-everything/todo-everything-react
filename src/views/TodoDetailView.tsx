import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteTodo, useSingleTodo } from '~/lib/todos.ts'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { TbTrash } from 'react-icons/tb'
import Modal from '~/components/Modal.tsx'
import { useState } from 'react'

interface TodoDetailViewProps {}

export default function TodoDetailView(props: TodoDetailViewProps) {
  const { todoId } = useParams()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const todoQuery = useSingleTodo(todoId)
  const todo = todoQuery.data
  const deleteTodoMutation = useDeleteTodo(Number.parseInt(todoId, 10))

  if (todoQuery.isLoading) {
    return <div className="w-full h-full">Todo loading...</div>
  }

  if (!todoQuery.data) {
    return <div>No data?</div>
  }

  const handleEditClick = () => {
    navigate(`/todos/${todoId}/edit`)
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
    <div className="mx-auto w-full mt-4">
      {showDeleteModal && (
        <Modal
          showModal={showDeleteModal}
          title="Delete this todo?"
          body="Are you sure you want to delete this?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
      <h3 className="text-xl font-semibold">{todo.title}</h3>
      <hr className="mb-10" />
      <div className="prose">
        <Markdown remarkPlugins={[remarkGfm]}>{todo.body}</Markdown>
      </div>

      <div className="w-full mt-5 flex flex-row">
        <button
          className="btn btn-error"
          type="button"
          onClick={handleConfirmDelete}
        >
          <TbTrash /> Delete
        </button>
        <div className="join justify-end ml-auto">
          <button
            className="join-item btn btn-primary"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}
