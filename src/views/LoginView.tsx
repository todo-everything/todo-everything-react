import LoginForm from '~/components/LoginForm'
import { Link } from 'react-router-dom'

export default function LoginView() {
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark lg:py-32">
      <div className="relative mx-auto max-w-lg overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-14">
        <LoginForm />
        <a
          href="/#"
          className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
        >
          Forget Password?
        </a>
        <p className="text-base text-body-color dark:text-dark-6">
          <span className="pr-0.5">Need an account?</span>
          <Link to="/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  )
}
