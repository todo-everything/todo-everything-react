import LoginForm from '~/components/LoginForm'
import { Link } from 'react-router-dom'

export default function LoginView() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mx-auto mb-auto mt-64 w-96 overflow-hidden bg-neutral-200 p-8 rounded-box">
        <LoginForm className="p-2" />
        <p className="text-base text-body-color dark:text-dark-6">
          <span className="pr-0.5">Need an account?</span>
          <Link to="/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
