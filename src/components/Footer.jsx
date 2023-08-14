import { useNavigate } from 'react-router-dom'

function Footer() {
  const footerYear = new Date().getFullYear()
  const navigate = useNavigate()
  return (
    <footer className='py-10 bg-darkBlueGreen'>
      <div className="flex flex-col px-5 space-y-5 mx-auto w-full max-w-[1800px] justify-between items-center sm:px-10 md:flex-row md:space-y-0">
        <h1 className="font-sans text-white font-black text-4xl hover:cursor-pointer" onClick={()=> navigate('/')}>chapters</h1>
        <p className="font-sans font-bold text-2xl text-white">&copy; {footerYear} <span className='text-sm font-semibold uppercase'>rmfn</span> </p>
      </div>
    </footer>
  )
}

export default Footer