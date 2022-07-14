import { PencilAltIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export interface IEditButton extends React.ComponentPropsWithoutRef<'button'> {
  href: string
}

const EditButton: React.FC<IEditButton> = ({ href }) => {
  return (
    <Link passHref href={href}>
      <button className="p-1">
        <PencilAltIcon className="h-5 w-5 text-zinc-600" />
      </button>
    </Link>
  )
}

export default EditButton
