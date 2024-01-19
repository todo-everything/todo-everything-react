import { Link } from 'react-router-dom'
import NewAccountForm from '~/components/NewAccountForm'

export default function RegisterView() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mx-auto mb-auto mt-64 w-96 overflow-hidden bg-neutral-200 p-8 rounded-box">
        <NewAccountForm />
        <a
          href="/#"
          className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
        >
          Forget Password?
        </a>
        <p className="text-base text-body-color dark:text-dark-6">
          <span className="pr-0.5">Have an account?</span>
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
