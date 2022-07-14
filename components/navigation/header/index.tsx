import { Menu } from '@headlessui/react'
import Logo from 'assets/images/erd-metal-logo-white.png'
import AuthContext from 'context/auth'
import Image from 'next/image'
import Link from 'next/link'
import { forwardRef, useContext } from 'react'

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const navigation = [
  {
    id: 'companies',
    links: ['industries', 'groups', 'companies'],
  },
  {
    id: 'database',
    links: ['molds', 'alloys', 'surfaces', 'colors', 'drawings'],
  },
  {
    id: 'parts',
    links: ['manufactured', 'purchased'],
  },
  {
    id: 'projects',
    links: ['projects', 'products'],
  },
  {
    id: 'inquiries',
    links: ['new', 'inquiries'],
  },
]

/* eslint-disable */
const MyLink = forwardRef((props: any, ref: any) => {
  let { href, children, ...rest } = props
  return (
    <Link href={href} shallow={false}>
      <a
        className="hover:bg-zinc-300 font-bold text-zinc-700 group flex w-full items-center rounded-md px-2 py-2 text-sm"
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    </Link>
  )
})
/* eslint-enable  */

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  const { authenticated, login, logOut } = useContext(AuthContext)

  return (
    <header {...headerProps} className={`${className}`}>
      <nav className="mb-6 bg-zinc-700 text-white h-16 flex items-center">
        <div className="container">
          <div className="flex justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Image src={Logo} alt="Erd Metal" width={23} height={20} />
                <p className="text-2xl font-bold select-none">ERD INQUIRY</p>
                <span className="ml-2 text-xs bg-blue-600 rounded text-white px-1 py-0.5 font-bold">ALPHA v1.0.0</span>
              </div>
            </Link>

            <div className="flex gap-2">
              {navigation.map(
                (el, key) =>
                  authenticated && (
                    <Menu key={key} as="div" className="relative inline-block text-left">
                      <Menu.Button className="select-none capitalize inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        {el.id}
                      </Menu.Button>

                      <Menu.Items className="z-50 capitalize absolute right-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {el.links.map((link, key) => (
                          <div key={key} className="px-1 py-1 z-50 select-none">
                            <Menu.Item>
                              <MyLink href={`/${el.id}/${link}`}>{link}</MyLink>
                            </Menu.Item>
                          </div>
                        ))}
                      </Menu.Items>
                    </Menu>
                  )
              )}
              <button
                onClick={authenticated ? logOut : login}
                className="elect-none capitalize inline-flex w-full justify-center rounded-md bg-blue-600 bg-opacity-90 px-4 py-2 text-sm font-medium transition-opacity text-white hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                {authenticated ? 'Sign Out' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
