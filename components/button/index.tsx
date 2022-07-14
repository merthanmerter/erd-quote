import React from 'react'

type Button = {
	children: string
	onClick?: any
	ref?: any
	active?: boolean
}

/* eslint-disable */
const Button: React.FC<Button> = React.forwardRef((props: any, ref: any) => {
	return (
		<button
			ref={ref}
			onClick={props?.onClick}
			className='transition-colors tinline-flex justify-center rounded border border-transparent bg-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2'>
			{props.children}
		</button>
	)
})
/* eslint-enable  */

export default Button
