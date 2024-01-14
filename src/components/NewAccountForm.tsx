import { RegisterAccountDTO } from '~/api/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import AuthApi from '~/lib/auth.ts'
import { useNavigate } from 'react-router-dom'

interface NewAccountFormProps {}

export default function NewAccountForm(props: NewAccountFormProps) {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterAccountDTO>()
  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationFn: AuthApi.registerAccount,
    onSuccess: (data) => {
      reset()
      navigate('/todos')
    },
    onError: (e) => {
      const errorData = e?.response?.data ?? {}
      const statusCode = e?.response?.status

      for (const fieldKey in errorData) {
        setError(fieldKey, {
          type: statusCode,
          message: errorData[fieldKey],
        })
      }
    },
  })

  const handleSubmit: SubmitHandler<RegisterAccountDTO> = async (data) => {
    registerMutation.mutate(data)
  }

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)}>
      <div className="form-control w-full">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          className={`input input-bordered w-full ${
            errors.email && `input-error`
          }`}
          type="email"
          placeholder="email@example.com"
          {...register('email', { required: true })}
        />
        {errors.email && <div>{errors.email.message} </div>}
      </div>

      <div className="form-control">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          className="input input-bordered w-full"
          type="password"
          {...register('password', { required: true })}
        />
      </div>

      <button
        className="btn btn-primary w-full mt-4"
        disabled={registerMutation.isPending}
        color="primary"
        type="submit"
      >
        {registerMutation.isPending ? 'Working...' : 'Create account'}
      </button>
    </form>
  )
}
