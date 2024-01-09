import { LoginCredentialsDTO } from '~/api/auth.ts'
import { Button, Input } from 'react-daisyui'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import AuthApi from '~/lib/auth.ts'
import { AxiosError } from 'axios'
import { useUserStore } from '~/stores/user'

interface LoginFormProps {}

export default function LoginForm(props: LoginFormProps) {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm<LoginCredentialsDTO>()

  const user = useUserStore((state) => state.user)

  const loginMutation = useMutation({
    mutationFn: AuthApi.login,
    onError: (error: AxiosError) => {
      throw new Error(error.response.data)
    },
    onSuccess: (data) => {
      console.log('finished login', { data })
    },
  })

  const handleSubmit: SubmitHandler<LoginCredentialsDTO> = async (data) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)}>
      <div>{JSON.stringify(user, null, 2)}</div>
      <div className="form-control w-full">
        <label htmlFor="" className="label">
          <span className="label-text">Email</span>
        </label>
        <Input
          type="email"
          placeholder="email@example.com"
          {...register('email', { required: true })}
        />
        {errors.email && <div>Email error: {errors.email.message}</div>}
      </div>

      <div className="form-control">
        <label htmlFor="" className="label">
          <span className="label-text">Password</span>
        </label>
        <Input
          className="input"
          type="password"
          {...register('password', { required: true })}
        />
      </div>

      <Button
        disabled={loginMutation.isPending}
        color="primary"
        type="submit"
        value="Sign In"
        fullWidth={true}
        className="mt-4"
      >
        {loginMutation.isPending ? 'Working...' : 'Login'}
      </Button>
    </form>
  )
}
