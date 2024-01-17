import { useUserStore } from '~/stores/user.ts'

export default function AccountView() {
  const user = useUserStore((state) => state.user)
  return <div>{user && <div>{JSON.stringify(user, null, 2)}</div>}</div>
}
