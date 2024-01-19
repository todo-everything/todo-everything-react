import { RegisterAccountDTO } from '~/api/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import AuthApi from '~/lib/auth.ts'
import { useNavigate } from 'react-router-dom'
import { TbAlertCircle } from 'react-icons/tb'
import { AxiosError } from 'axios'

interface NewAccountFormProps {
  className?: string
}

export default function NewAccountForm({ className }: NewAccountFormProps) {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterAccountDTO>({ criteriaMode: 'all' })
  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationFn: AuthApi.registerAccount,
    onSuccess: (data) => {
      reset()
      navigate('/todos')
    },
    onError: (e: AxiosError) => {
      const errorData = e?.response?.data ?? {}
      const statusCode = e?.response?.status
      console.log('on error', { errorData, statusCode, ecode: e.code, res: e })
      // We have a non-server error. Maybe client network not working properly.
      if (e.code === 'ERR_NETWORK') {
        console.log('setting error?')
        setError('root.serverError', {
          type: e.code,
          message:
            e.message || 'Unable to contact login servers. Try again later.',
        })
      }

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
    <form className={`${className}`} onSubmit={rhfHandleSubmit(handleSubmit)}>
      {errors?.root?.serverError && (
        <div role="alert" className="alert alert-error mb-2">
          <TbAlertCircle /> {errors.root.serverError.message}
        </div>
      )}

      <div className="form-control w-full">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          className={`input input-bordered w-full ${
            errors.email && `input-error rounded-b-none`
          }`}
          type="email"
          placeholder="email@example.com"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <div className="bg-error alert-error py-1 px-2 text-center text-xs text-error-content">
            {errors.email.message}{' '}
          </div>
        )}
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
