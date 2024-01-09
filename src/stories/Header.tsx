import { default as _Header } from '~/components/Header'

export default function Header(props) {
  return (
    <div className="w-full">
        <_Header user={props.user} />
    </div>
  )
}
