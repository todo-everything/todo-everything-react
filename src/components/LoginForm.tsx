import { LoginCredentialsDTO } from '~/api/auth.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import AuthApi from '~/lib/auth.ts'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
  className?: string
}

export default function LoginForm({ className, ...others }: LoginFormProps) {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginCredentialsDTO>()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      reset()
      navigate('/todos')
    },
    onError: (e) => {
      const errorData = e?.response?.data ?? {}
      const statusCode = e?.response?.status
      for (const fieldKey in errorData) {
        console.log(fieldKey, {
          type: statusCode,
          message: errorData[fieldKey],
        })
        setError(fieldKey, {
          type: statusCode,
          message: errorData[fieldKey],
        })
      }
    },
  })

  const handleSubmit: SubmitHandler<LoginCredentialsDTO> = async (data) => {
    loginMutation.mutate(data)
  }

  return (
    <form className={`${className}`} onSubmit={rhfHandleSubmit(handleSubmit)}>
      <div className="form-control w-full">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          className="input input-bordered w-full"
          type="email"
          placeholder="email@example.com"
          {...register('email', { required: true })}
        />
        {errors.email && <div>Email error: {errors.email.message}</div>}
      </div>

      <div className="form-control w-full mt-2">
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
        disabled={loginMutation.isPending}
        color="primary"
        type="submit"
        value="Sign In"
      >
        {loginMutation.isPending ? 'Working...' : 'Login'}
      </button>
    </form>
  )
}
