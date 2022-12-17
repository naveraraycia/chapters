import { useNavigate, Link } from 'react-router-dom'
import notFoundImg from '../assets/svg/notFoundPage.svg'

function NotFound() {
  const navigate = useNavigate()
  return (
    <>
    
      <div className='flex items-center justify-between px-5 py-10 md:pb-0 md:pt-16 md:px-36'>
        <p className="font-sans z-40 text-5xl font-black text-darkBlueGreen hover:cursor-pointer" onClick={()=> navigate('/') }>chapters</p>
      </div>

      <div className="flex flex-col items-center justify-center px-5 py-10 md:px-36 space-y-5">
        <img src={notFoundImg} alt="404 Not Found" className='w-[400px]' />

        <div className="flex flex-col space-y-8 font-sans text-darkBlueGreen">
          <h1 className="text-3xl text-center font-black">Ooops! That page doesn’t seem to exist...</h1>

          <p className="font-light text-center text-xl">
            <Link to='/' className='font-bold hover:underline'>Click here</Link> to go back
          </p>
        </div>
      </div>
    </>
  )
}

export default NotFound