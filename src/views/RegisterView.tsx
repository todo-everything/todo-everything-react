import { Link } from 'react-router-dom'
import NewAccountForm from '~/components/NewAccountForm'

export default function RegisterView() {
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
      <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
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
    </section>
  )
}
