import { useNavigate } from 'react-router-dom'
import { useUserStore } from '~/stores/user'

export default function LandingView() {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)

  const text = `
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam at
        atque, autem corporis dolorum, ipsa labore laudantium maxime modi
        necessitatibus perferendis possimus quas rerum sapiente tempora tenetur
        vel vitae!
  `
  return (
    <div className="">
      <h1>Landing page</h1>
      <p>{text}</p>

      {user && <div>There's a user: {JSON.stringify(user, null, 2)}</div>}

      <button
        className="btn mt-2"
        type="button"
        color="primary"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
      <button
        className="btn mt-2"
        type="button"
        color="primary"
        onClick={() => navigate('/todos')}
      >
        Login
      </button>
    </div>
  )
}
