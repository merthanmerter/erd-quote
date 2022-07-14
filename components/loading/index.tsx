import { DotsVerticalIcon } from '@heroicons/react/solid'

export interface ILoading extends React.ComponentPropsWithoutRef<'div'> {}

const Loading: React.FC<ILoading> = () => {
  return (
    <div className="w-full flex justify-center items-center text-center">
      <div className="h-12 w-12">
        <DotsVerticalIcon className="text-zinc-600 animate-spin" />
      </div>
    </div>
  )
}

export default Loading
