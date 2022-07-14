export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

const Footer: React.FC<IFooter> = () => {
  return (
    <footer className="container">
      <p className="text-xs font-bold mt-6 py-2">Erd Metal Inc.</p>
    </footer>
  )
}

export default Footer
