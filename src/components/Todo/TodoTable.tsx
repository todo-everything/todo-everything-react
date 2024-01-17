import cx from 'clsx'
import { useState } from 'react'
import { ITodo } from '~/api/models'

interface TodoTableProps {
  todos: ITodo[]
}

export default function TodoTable({ todos = [] }: TodoTableProps) {
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
    return (
      <tr key={item.id} className={cx({ selected: selected })}>
        <td>
          <input
            type="checkbox"
            className="checkbox"
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </td>
        <td>{item.title}</td>
        <td>{item.completed}</td>
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
