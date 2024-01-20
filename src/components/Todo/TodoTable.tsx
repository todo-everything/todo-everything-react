import cx from 'clsx'
import { useState } from 'react'
import { ITodo } from '~/api/models'
import { useNavigate } from 'react-router-dom'

interface TodoTableProps {
  todos: ITodo[]
  onTodoClick: (todoId: number) => void
}

export default function TodoTable({ todos = [], onTodoClick }: TodoTableProps) {
  const [selection, setSelection] = useState<ITodo[]>([])
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  const toggleAll = () =>
    setSelection((current) =>
      current.length === todos.length ? [] : todos.map((item) => item.id),
    )

  const rows = todos.map((item) => {
    const selected = selection.includes(item.id)
    const selectedClassName = cx({ selected: selected })
    return (
      <tr key={item.id} className={`${selectedClassName} hover:bg-base-200`}>
        <td>
          <input
            type="checkbox"
            className="checkbox"
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </td>
        <td className="p-4 cursor-pointer" onClick={() => onTodoClick(item.id)}>
          {item.title}
        </td>
      </tr>
    )
  })

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="w-12">
            <input
              type="checkbox"
              className="checkbox"
              onChange={toggleAll}
              checked={selection.length === todos.length}
            />
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}
