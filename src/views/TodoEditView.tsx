import { useParams } from 'react-router-dom'
import { useSingleTodo, useUpdateTodo } from '~/lib/todos.ts'
import { useRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  toolbarPlugin,
  UndoRedo,
  ListsToggle,
  CreateLink,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
} from '@mdxeditor/editor'
import { useForm } from 'react-hook-form'
import { type TodoDTO } from '~/api/todos.ts'
import _ from 'lodash'
import '@mdxeditor/editor/style.css'

interface TodoEditViewProps {}

const EditorToolbar = () => (
  <>
    <UndoRedo />
    <CreateLink />
    <BoldItalicUnderlineToggles />
    <BlockTypeSelect />
    <ListsToggle />
  </>
)

export default function TodoEditView(props: TodoEditViewProps) {
  const params = useParams()
  const todoQuery = useSingleTodo(params.todoId)
  const todo = _.pick(todoQuery.data, ['title', 'body'])
  const editorRef = useRef<MDXEditorMethods>(null)
  const updateTodo = useUpdateTodo(params.todoId)

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
  }

  if (todoQuery.isLoading) {
    return <div className="w-full h-full">Todo loading...</div>
  }

  if (!todoQuery.data) {
    return <div>No data?</div>
  }

  return (
    <div className="mx-auto w-full">
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
          <div className="border input-bordered rounded-btn">
            <MDXEditor
              className="outline-none prose"
              ref={editorRef}
              markdown={todo.body || 'none'}
              plugins={[
                toolbarPlugin({ toolbarContents: EditorToolbar }),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
              ]}
              onChange={handleBodyChange}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-5" type="submit">
          Update
        </button>
      </form>
    </div>
  )
}
