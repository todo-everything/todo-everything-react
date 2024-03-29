import { LoginCredentialsDTO } from '~/api/auth.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import AuthApi from '~/lib/auth.ts'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {}

export default function LoginForm(props: LoginFormProps) {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginCredentialsDTO>()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      reset()
      navigate('/todos')
    },
  })

  const handleSubmit: SubmitHandler<LoginCredentialsDTO> = async (data) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)}>
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
