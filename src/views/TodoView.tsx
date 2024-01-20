import { useTodos } from '~/lib/todos.ts'
import TodoTable from '~/components/Todo/TodoTable.tsx'
import { Outlet, useNavigate } from 'react-router-dom'
import Panel from '~/components/Layout/Panel.tsx'

export default function TodoView(props) {
  const navigate = useNavigate()
  const todos = useTodos()

  const handleTodoClick = (todoId: number) => {
    navigate(`/todos/${todoId}`)
  }

  return (
    <div className="w-full flex flex-row">
      <Panel>
        {todos.isLoading ? (
          <div>Loading...</div>
        ) : (
          <TodoTable todos={todos.data || []} onTodoClick={handleTodoClick} />
        )}
      </Panel>
      <Panel>
        <Outlet />
      </Panel>
    </div>
  )
}
