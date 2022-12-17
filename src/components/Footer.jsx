import { useNavigate } from 'react-router-dom'

function Footer() {
  const footerYear = new Date().getFullYear()
  const navigate = useNavigate()
  return (
    <footer className='px-5 py-10 md:px-36 bg-darkBlueGreen'>
      <div className="flex flex-col space-y-5 justify-between items-center md:flex-row md:space-y-0">
        <h1 className="font-sans text-white font-black text-4xl hover:cursor-pointer" onClick={()=> navigate('/')}>chapters</h1>
        <p className="font-sans font-bold text-2xl text-white">&copy; {footerYear} <span className='text-sm font-semibold uppercase'>rmfn</span> </p>
      </div>
    </footer>
  )
}

export default Footer