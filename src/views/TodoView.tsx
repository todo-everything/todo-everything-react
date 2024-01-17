import { useTodos } from '~/lib/todos.ts'
import TodoTable from '~/components/Todo/TodoTable.tsx'

export default function TodoView(props) {
  const todos = useTodos()

  return (
    <div className="h-auto w-full flex flex-col mx-auto">
      {todos.isLoading ? (
        <div>Loading...</div>
      ) : (
        <TodoTable todos={todos.data} />
      )}
    </div>
  )
}
