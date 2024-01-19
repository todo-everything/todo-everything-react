import { useNavigate, useParams } from 'react-router-dom'
import { useSingleTodo } from '~/lib/todos.ts'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface TodoDetailViewProps {}

export default function TodoDetailView(props: TodoDetailViewProps) {
  const params = useParams()
  const todoQuery = useSingleTodo(params.todoId)
  const todo = todoQuery.data
  const navigate = useNavigate()

  if (todoQuery.isLoading) {
    return <div className="w-full h-full">Todo loading...</div>
  }

  if (!todoQuery.data) {
    return <div>No data?</div>
  }

  const handleEditClick = () => {
    navigate(`/todos/${params.todoId}/edit`)
  }

  return (
    <div className="mx-auto w-full mt-4">
      <h3 className="text-xl font-semibold">{todo.title}</h3>
      <hr className="mb-10" />
      <div className="prose">
        <Markdown remarkPlugins={[remarkGfm]}>{todo.body}</Markdown>
      </div>
      <div className="mt-8">
        <button className="btn btn-primary" onClick={handleEditClick}>
          Edit
        </button>
      </div>
    </div>
  )
}
