import { useTodos } from '~/lib/todos.ts'

export default function TodoView(props) {
  const todos = useTodos()

  return (
    <div>
      {todos.isLoading && <div>Is loading??</div>}
      <h1>Todos are here</h1>
      <div className="h-auto w-full flex flex-col">
        {todos.data && todos.data.map((todo) => <div>{todo.title}</div>)}
      </div>
    </div>
  )
}
